import React, { useState, useEffect, useContext } from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native-ui-lib';
import { RootStackParams, RouteNames } from '../../navigation';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, TouchableOpacity } from 'react-native';
import styles from './styles';
import AppImages from '../../constants/AppImages';
import ProfileModal from './ProfileModal';
import { BasicInfoModal } from './BasicInfoModal';
import { QualificationModal } from './QualificationModal';
import { ExperienceModal } from './ExperienceModal';
import { SkillsModal } from './SkillsModal';
import { ResumeModal } from './ResumeModal';
export type MyJobProfileNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'MyJobProfile'
>;

export type MyJobProfileRouteProps = RouteProp<RootStackParams, 'MyJobProfile'>;

interface Props { }

const MyJobProfile: React.FC<Props> = ({ }) => {
  const navigation = useNavigation<MyJobProfileNavigationProps>();
  const [editType, setEditType] = useState<string | null>(null);

  const openEdit = (type: string) => setEditType(type);
  const closeEdit = () => setEditType(null);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* 🔥 PROFILE HEADER */}
      <View style={styles.header}>

        {/* 🔙 Back Button (floating) */}
        <TouchableOpacity style={styles.backBtn} onPress={() => {navigation.goBack()}}>
          <Image
            source={AppImages.ARROW_LEFT}
            style={{ width: 18, height: 18, tintColor: '#2563EB' }}
          />
        </TouchableOpacity>

        {/* 👤 CONTENT */}
        <TouchableOpacity onPress={() => openEdit('profile')}>

          <View style={styles.headerContent}>

            <View>
              <Image source={AppImages.PROFILE} style={styles.avatar} />

              {/* edit indicator */}
              <TouchableOpacity
                style={styles.avatarEditBadge}
                onPress={() => openEdit('profile')}
              >
                <Text style={styles.avatarEditText}>✎</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.name}>John Doe</Text>

            <Text style={styles.avail}>Immediate Joiner</Text>

          </View>
        </TouchableOpacity>

      </View>

      {/* 🔥 ABOUT */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Profile Summary</Text>
        <Text style={styles.description}>
          Passionate developer with 5+ years experience in mobile and web applications.
        </Text>
      </View>

      {/* 🔥 BASIC INFO */}
      <View style={styles.card}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Basic Info</Text>
          <TouchableOpacity onPress={() => openEdit('basic')}>
            <Text style={styles.add}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoGrid}>
          {renderInfo("Email", "john@gmail.com")}
          {renderInfo("Phone", "+91 9876543210")}
          {renderInfo("Gender", "Male")}
          {renderInfo("Nationality", "Indian")}
          {renderInfo("Visa Status", "Valid")}
          {renderInfo("Languages", "English, Hindi")}
        </View>
      </View>

      {/* 🔥 QUALIFICATION */}
      <View style={styles.card}>
        <SectionHeader 
        title="Qualification" 
        desc="Add your academic qualification details such as School, Under graduation and Post graduation degree." 
        onPress={() => openEdit('qualification')} />

        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>B.Tech - Computer Science</Text>
          <Text style={styles.detailSub}>KTU, India</Text>
          <Text style={styles.detailDate}>2018 - 2022</Text>
          <ActionRow onPress={() => openEdit('qualification')} />
        </View>
      </View>

      {/* 🔥 EXPERIENCE */}
      <View style={styles.card}>
        <SectionHeader title="Experience" desc="Add your current and past work experiences." onPress={() => openEdit('experience')} />

        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>React Native Developer</Text>
          <Text style={styles.detailSub}>ABC Pvt Ltd • IT</Text>
          <Text style={styles.detailSub}>India</Text>
          <Text style={styles.detailDate}>2022 - Present</Text>
          <Text style={styles.descText}>
            Building mobile apps and handling API integrations.
          </Text>
          <ActionRow onPress={() => openEdit('experience')} />
        </View>
      </View>

      {/* 🔥 SKILLS */}
      <View style={styles.card}>
        <SectionHeader title="Skills" desc="Add your technical or soft skills such as Salesforce, Communication skills etc." onPress={() => openEdit('skills')} />

        <View style={styles.skillWrap}>
          {["React", "React Native", "Node.js", "Firebase"].map((skill, i) => (
            <View key={i} style={styles.skillChip}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 🔥 RESUME */}
      <View style={styles.card}>
        <SectionHeader title="Resume" desc="Upload your most recent resume." onPress={() => openEdit('resume')} />

        <View style={styles.resumeCard}>
          <View style={styles.fileIconBox}>
            <Text>📄</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.fileName}>John_Doe_Resume.pdf</Text>
          </View>

          <View>
            <Text style={styles.delete}>Delete</Text>
          </View>
        </View>
      </View>

      {/* 🔥 MODALS */}
      <ProfileModal visible={editType === 'profile'} onClose={closeEdit} />
      <BasicInfoModal visible={editType === 'basic'} onClose={closeEdit} />
      <QualificationModal visible={editType === 'qualification'} onClose={closeEdit} />
      <ExperienceModal visible={editType === 'experience'} onClose={closeEdit} />
      <SkillsModal visible={editType === 'skills'} onClose={closeEdit} />
      <ResumeModal visible={editType === 'resume'} onClose={closeEdit} />


    </ScrollView>
  );
};

/* 🔥 COMPONENTS */

const renderInfo = (label: string, value: string) => (
  <View style={styles.infoBox}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue} numberOfLines={2}>
      {value}
    </Text>
  </View>
);

const SectionHeader = ({ title, desc, onPress }: { title: string, desc: string, onPress: () => void }) => (
  <View style={{ marginBottom: 10 }}>
    <View style={styles.sectionRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.add}>+ Add</Text>
      </TouchableOpacity>
    </View>
    <Text style={styles.sectionDesc}>{desc}</Text>
  </View>
);

const ActionRow = ({ onPress }: { onPress: () => void }) => (
  <View style={styles.actionRow}>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.action}>Edit</Text>
    </TouchableOpacity>
    <Text style={styles.delete}>Delete</Text>
  </View>
);

export default MyJobProfile;
