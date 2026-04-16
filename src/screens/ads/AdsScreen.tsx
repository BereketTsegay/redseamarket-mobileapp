import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Image, Text, View } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams, RouteNames } from '../../navigation';

import { useDispatch } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';

import AppColors from '../../constants/AppColors';
import AppImages from '../../constants/AppImages';
import Header from '../../components/Header';
import { CommonContext } from '../../api/commonContext';
import { styles } from './styles';
import { fetchAdList } from '../../api/ads/AdListSlice';
import AppFonts from '../../constants/AppFonts';
import moment from 'moment';

export type AdsScreenNavigationProps =
  NativeStackNavigationProp<RootStackParams, 'AdsScreen'>;

/* ✅ UI TABS (Label + API VALUE) */
const TABS = [
  { label: 'Live', value: 'live' },
  { label: 'Draft', value: 'draft' },
  { label: 'Pending Payment', value: 'pending-payment' },
  { label: 'Under Review', value: 'under-review' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Expired', value: 'expired' },
  { label: 'Stopped', value: 'stopped' },
];

const AdsScreen: React.FC = () => {
  const navigation = useNavigation<AdsScreenNavigationProps>();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const { commonInput } = useContext(CommonContext);

  const [selectedTab, setSelectedTab] = useState('live');
  const tabRef = useRef<FlatList>(null);

  const [ads, setAds] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const index = TABS.findIndex(t => t.value === selectedTab);

    if (index !== -1) {
      tabRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5, // 👈 center it nicely
      });
    }
  }, [selectedTab]);

  /* ================= API ================= */

  const PER_PAGE = 10;

  const fetchAds = async (
    tab = selectedTab,
    pageNo = 1,
    isLoadMore = false
  ) => {
    try {
      isLoadMore ? setLoadingMore(true) : setLoading(true);

      const request = JSON.stringify({
        status: tab,
        page: pageNo,
        per_page: PER_PAGE,
      });

      const res: any = await dispatch(fetchAdList({ requestBody: request }));
      const response = res?.payload?.adLists;

      if (response?.success) {
        const newAds = response?.data?.ads || [];

        // ✅ CORE FIX
        if (newAds.length < PER_PAGE) {
          setHasMore(false); // last page
        } else {
          setHasMore(true);
        }

        if (isLoadMore) {
          setAds(prev => [...prev, ...newAds]);
        } else {
          setAds(newAds);
        }
      }
    } catch (e) {
      console.log('ERROR', e);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  /* ================= EFFECT ================= */

  useEffect(() => {
    setPage(1);
    setAds([]);
    setHasMore(true); // ✅ IMPORTANT
    fetchAds(selectedTab, 1, false);
  }, [selectedTab]);

  /* ================= PAGINATION ================= */

  const loadMore = () => {
    if (loadingMore || !hasMore) return;

    const nextPage = page + 1;
    setPage(nextPage);
    fetchAds(selectedTab, nextPage, true);
  };

  /* ================= HELPERS ================= */

  const getTitle = (item: any) =>
    item?.fields?.['Title'] ||
    item?.fields?.['Head Line'] ||
    item?.fields?.['title'] ||
    item?.fields?.['Job title'] ||
    'Untitled Ad';

  const getImage = (item: any) =>
    item?.images?.length > 0
      ? { uri: item.images[0] }
      : AppImages.PLACEHOLDER;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return { bg: '#E8F8F0', text: '#27AE60' };
      case 'rejected':
        return { bg: '#FDECEC', text: '#EB5757' };
      case 'expired':
        return { bg: '#F2F2F2', text: '#999999' };
      case 'draft':
        return { bg: '#FFF8E1', text: '#F2C94C' };
      case 'pending-payment':
        return { bg: '#FFF3E0', text: '#F2994A' };
      case 'under-review':
        return { bg: '#EAF2FF', text: '#2F80ED' };
      case 'stopped':
        return { bg: '#F3EFFF', text: '#6C5CE7' };
      default:
        return { bg: '#EAF2FF', text: '#2F80ED' };
    }
  };

  const getDescription = (item: any) =>
    item?.fields?.['Description'] ||
    item?.fields?.['Job Description'] ||
    item?.fields?.['Describe your property'] ||
    '';

  /* ================= UI ================= */

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={getImage(item)} style={styles.image} />

      {/* STATUS */}
      <View
        style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(item.status).bg },
        ]}>
        <Text style={{ color: getStatusColor(item.status).text, fontSize: 11, fontFamily: AppFonts.POPPINS_MEDIUM }}>
          {item.status.toUpperCase()}
        </Text>
      </View>

      <View style={styles.content}>
        <View gap-2>
          <Text style={styles.title} numberOfLines={1}>
            {getTitle(item)}
          </Text>

          {/* 🔥 REF */}
          <Text>
            📌 <Text style={[styles.meta,{color: '#1b08ee'}]}>{item.ref_no}</Text>
          </Text>

          {/* 🔥 CATEGORY */}
          <Text style={styles.meta}>
            🏷 {item.category || 'No Category'}
          </Text>

          {/* 🔥 DESCRIPTION */}
          {getDescription(item) ? (
            <Text style={styles.desc} numberOfLines={1}>
              📝 {getDescription(item)}
            </Text>
          ) : null}

          {/* 🔥 DATE */}
          <Text style={styles.date}>
            📅 {moment(item.created_at).format('MMM DD, YYYY')}
          </Text>
        </View>

        <View bottom marginT-10 style={{ borderTopColor: '#EEE', borderTopWidth: 1 }}>
          {item.status === 'live' && (
            <TouchableOpacity
              style={styles.viewBtn}
              onPress={() =>
                navigation.navigate(RouteNames.DetailsScreen, {
                  adId: item.id,
                  countryId: commonInput.common_country_id,
                  edit: true,
                })
              }>
              <Text style={styles.viewText}>View Live Ad</Text>
            </TouchableOpacity>
          )}

          {item.status === 'live' && (
            <TouchableOpacity style={styles.stopBtn}>
              <Text style={styles.stopText}>⏸ Stop Sharing</Text>
            </TouchableOpacity>
          )}

          {item.status === 'draft' && (
            <TouchableOpacity style={[styles.stopBtn, { backgroundColor: '#8b8e90' }]}>
              <Text style={[styles.stopText, { color: '#fff' }]}>Complete Ad</Text>
            </TouchableOpacity>
          )}

          {item.status === 'pending-payment' && (
            <TouchableOpacity style={[styles.stopBtn, { backgroundColor: '#579ef0' }]}>
              <Text style={[styles.stopText, { color: '#fff' }]}>Complete Payment</Text>
            </TouchableOpacity>
          )}

          {item.status === 'under-review' && (
            <TouchableOpacity style={[styles.stopBtn, { backgroundColor: '#81ddeb' }]}>
              <Text style={[styles.stopText, { color: '#fff' }]}>🕒 Under Review</Text>
            </TouchableOpacity>
          )}

          {item.status === 'rejected' && (
            <>
              <TouchableOpacity style={[styles.stopBtn, { backgroundColor: '#f19d9d' }]}>
                <Text style={[styles.stopText, { color: '#5b5757' }]}>❌ Ad Rejected</Text>
              </TouchableOpacity>

              <Text style={styles.reasonText}>
                Reason: {item.reject_reason || 'No reason provided'}
              </Text>

              <TouchableOpacity style={[styles.editBtn, { backgroundColor: '#579ef0' }]}>
                <Text style={[styles.editText, { color: '#fff' }]}>✏️ Edit & Resubmit</Text>
              </TouchableOpacity>
            </>
          )}

          {item.status === 'expired' && (
            <TouchableOpacity style={[styles.stopBtn, { backgroundColor: '#f19d9d' }]}>
              <Text style={[styles.stopText, { color: '#5b5757' }]}> Renew Now</Text>
            </TouchableOpacity>
          )}

          {item.status === 'stopped' && (
            <TouchableOpacity style={[styles.stopBtn, { backgroundColor: '#033d11' }]}>
              <Text style={[styles.stopText, { color: '#fff' }]}>▶️ Start Sharing</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View flex backgroundColor={AppColors.white}>
      <Header title="My Ads" />

      {/* ================= TABS ================= */}
      <View>
        <FlatList
          ref={tabRef}
          horizontal
          data={TABS}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.value}
          contentContainerStyle={{
            paddingHorizontal: 12,
            paddingVertical: 12,
          }}
          ItemSeparatorComponent={() => <View width={10} />}
          renderItem={({ item }) => {
            const isActive = selectedTab === item.value;

            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedTab(item.value)}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 14,
                  borderRadius: 15,
                  backgroundColor: isActive ? AppColors.blue : '#F5F7FA',
                  borderWidth: isActive ? 0 : 1,
                  borderColor: '#E4E7EC',
                  flexDirection: 'row',
                  alignItems: 'center',

                  // subtle shadow
                  shadowColor: '#000',
                  shadowOpacity: isActive ? 0.15 : 0.05,
                  shadowRadius: 6,
                  elevation: isActive ? 4 : 1,
                }}
              >
                {/* LABEL */}
                <Text
                  style={{
                    color: isActive ? '#FFF' : '#344054',
                    fontSize: 13,
                    fontFamily: AppFonts.POPPINS_REGULAR
                  }}
                >
                  {item.label}
                </Text>

                {/* COUNT BADGE */}
                <View
                  style={{
                    marginLeft: 6,
                    borderRadius: 9,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 5,

                    backgroundColor: isActive ? '#FFFFFF33' : '#E4E7EC',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '700',
                      color: isActive ? '#FFF' : '#667085',
                    }}
                  >
                    0
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View flex>

        {/* ================= LIST ================= */}
        {loading ? (
          <ActivityIndicator size="large" color={AppColors.blue} />
        ) : (
          <FlatList
            data={ads}
            numColumns={2}
            keyExtractor={(item, index) => item.id + index}
            renderItem={renderItem}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}

            ListEmptyComponent={
              <Text style={{ textAlign: 'center', marginTop: 40 }}>
                No Ads Found
              </Text>
            }

            ListFooterComponent={
              loadingMore ? (
                <View paddingB-12>
                  <ActivityIndicator size="small" color={AppColors.blue} />
                </View>
              ) : !hasMore && ads.length > 0 ? (
                <Text style={{ textAlign: 'center', padding: 10, marginBottom: 12, color: '#666' }}>
                  --End--
                </Text>
              ) : null
            }
          />
        )}
      </View>
    </View>
  );
};

export default AdsScreen;