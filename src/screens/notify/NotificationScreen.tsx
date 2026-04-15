import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppColors from '../../constants/AppColors';
import AppImages from '../../constants/AppImages';
import { styles } from './styles';
import { Image } from 'react-native-ui-lib';
import ItemDropdown from '../../components/ItemDropdown';

const DATA = [
    {
        id: '1',
        title: 'Ad Approved',
        desc: 'Your advertisement (Ref: JAB_2026041311163176) has been approved and is now live.',
        time: '1 day ago',
        type: 'approved',
        isRead: false,
        createdAt: 3,
    },
    {
        id: '2',
        title: 'Ad Rejected',
        desc: 'Your advertisement (Ref: JAB_2026041311163176) has been rejected.',
        time: '2 days ago',
        type: 'rejected',
        isRead: false,
        createdAt: 2,
    },
    {
        id: '3',
        title: 'Ad Approved',
        desc: 'Approved and live.',
        time: '3 days ago',
        type: 'approved',
        isRead: true,
        createdAt: 1,
    },
];

const STATUS_OPTIONS = [
    { id: 'all', name: 'All Status' },
    { id: 'read', name: 'Read Only' },
    { id: 'unread', name: 'Unread Only' },
];

const SORT_OPTIONS = [
    { id: 'recent', name: 'Most Recent' },
    { id: 'oldest', name: 'Oldest First' },
];

const NotificationScreen = () => {
    const navigation = useNavigation();

    const [list, setList] = useState(DATA);

    const [statusFilter, setStatusFilter] = useState<'all' | 'read' | 'unread'>('all');
    const [sortType, setSortType] = useState<'recent' | 'oldest'>('recent');

    /* ================= FILTER + SORT ================= */

    const filteredList = useMemo(() => {
        let data = [...list];

        // STATUS FILTER
        if (statusFilter === 'read') {
            data = data.filter(i => i.isRead);
        } else if (statusFilter === 'unread') {
            data = data.filter(i => !i.isRead);
        }

        // SORT
        if (sortType === 'recent') {
            data.sort((a, b) => b.createdAt - a.createdAt);
        } else {
            data.sort((a, b) => a.createdAt - b.createdAt);
        }

        return data;
    }, [list, statusFilter, sortType]);

    /* ================= ACTIONS ================= */

    const markAllRead = () => {
        setList(prev => prev.map(i => ({ ...i, isRead: true })));
    };

    const markSingleRead = (id: string) => {
        setList(prev =>
            prev.map(i =>
                i.id === id ? { ...i, isRead: true } : i
            )
        );
    };

    const deleteItem = (id: string) => {
        setList(prev => prev.filter(i => i.id !== id));
    };

    /* ================= UI ================= */

    const renderItem = ({ item }) => {
        const isApproved = item.type === 'approved';

        return (
            <View style={[styles.card, item.isRead && styles.readCard]}>

                {/* ICON */}
                <View
                    style={[
                        styles.iconBox,
                        {
                            backgroundColor: isApproved ? '#E6F7F0' : '#FDECEC',
                        },
                    ]}
                >
                    <Text style={{ fontSize: 18 }}>
                        {isApproved ? '✔' : '✖'}
                    </Text>
                </View>

                {/* CONTENT */}
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.desc}>{item.desc}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>

                {/* ACTIONS */}
                <View style={styles.rightActions}>
                    {!item.isRead && (
                        <TouchableOpacity onPress={() => markSingleRead(item.id)}>
                            <Text style={styles.markRead}>Mark as read</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity onPress={() => deleteItem(item.id)}>
                        <Text style={styles.delete}>🗑</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>

            {/* 🔙 HEADER */}
            <View style={styles.headerRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View style={{ padding: 8, borderRadius: 10, backgroundColor: '#FFFFFF', marginRight: 10 }}>
                            <Image source={AppImages.ARROW_LEFT} style={{ width: 20, height: 20 }} />
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Notifications</Text>
                </View>

                <TouchableOpacity onPress={markAllRead}>
                    <Text style={styles.markAll}>Mark all as read</Text>
                </TouchableOpacity>
            </View>

            {/* 🔽 FILTER ROW */}
            <View style={styles.filterRow}>

                {/* STATUS FILTER */}
                <View style={{ flex: 1, marginRight: 8 }}>
                    <ItemDropdown
                        value={statusFilter}
                        data={STATUS_OPTIONS}
                        dropdownType="Status"
                        add={(val: 'all' | 'read' | 'unread') => {
                            setStatusFilter(val);
                        }}
                    />
                </View>

                {/* SORT FILTER */}
                <View style={{ flex: 1 }}>
                    <ItemDropdown
                        value={sortType}
                        data={SORT_OPTIONS}
                        dropdownType="Sort"
                        add={(val: 'recent' | 'oldest') => {
                            setSortType(val);
                        }}
                    />
                </View>

            </View>

            {/* 📋 LIST */}
            <FlatList
                data={filteredList}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />

        </View>
    );
};

export default NotificationScreen;