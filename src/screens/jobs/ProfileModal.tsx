import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import ModalWrapper from './ModalWrapper';
import styles from './styles';
import AppImages from '../../constants/AppImages';
import InputField from '../../components/InputField';

const ProfileModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
    const [name, setName] = useState('John Doe');
    const [about, setAbout] = useState('');
    const [availability, setAvailability] = useState('immediate');
    const [profilePic, setProfilePic] = useState(null);

    const clearAll = () => {
        setName('');
        setAbout('');
        setAvailability('');
        setProfilePic(null);
    };

    return (
        <ModalWrapper visible={visible} onClose={onClose} title="Edit Profile">

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* 📸 PROFILE IMAGE */}
                <View style={styles.imageSection}>
                    <Image
                        source={profilePic || AppImages.PROFILE}
                        style={styles.profileImage}
                    />

                    <TouchableOpacity style={styles.uploadBtn}>
                        <Text style={styles.uploadText}>Change Photo</Text>
                    </TouchableOpacity>
                </View>

                {/* 👤 NAME */}
                <InputField
                    label={'Full Name'}
                    title={`Enter your name`}
                    value={name}
                    onChange={setName}
                />

                {/* 🧾 ABOUT */}
                <View style={{ marginBottom: 8 }}>
                    <InputField
                        label={'Profile Summary'}
                        title={`Enter your profile summary`}
                        multiline={true}
                        height={80}
                        value={about}
                        onChange={setAbout}
                    />

                    {/* ✅ Counter */}
                    <Text
                        style={{
                            fontSize: 12,
                            color: about.length >= 200 ? 'red' : '#888',
                            marginTop: -8,
                        }}
                    >
                        {about.length}/{200} letters
                    </Text>
                </View>

                {/* 🟢 AVAILABILITY */}
                <View style={styles.fieldBox}>
                    <Text style={styles.label}>Availability to Join</Text>

                    <View style={styles.radioRow}>

                        <TouchableOpacity
                            style={[
                                styles.radioBox,
                                availability === 'immediate' && styles.radioActive,
                            ]}
                            onPress={() => setAvailability('immediate')}
                        >
                            <Text
                                style={[
                                    styles.radioText,
                                    availability === 'immediate' && styles.radioTextActive,
                                ]}
                            >
                                Immediate Joiner
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.radioBox,
                                availability === 'notice' && styles.radioActive,
                            ]}
                            onPress={() => setAvailability('notice')}
                        >
                            <Text
                                style={[
                                    styles.radioText,
                                    availability === 'notice' && styles.radioTextActive,
                                ]}
                            >
                                Serving Notice
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </ScrollView>
            {/* 🔘 ACTIONS */}
            <View style={styles.actionRow}>

                <TouchableOpacity style={styles.clearBtn} onPress={clearAll}>
                    <Text style={styles.clearText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveBtn} onPress={onClose}>
                    <Text style={styles.saveText}>Save Profile</Text>
                </TouchableOpacity>

            </View>

        </ModalWrapper>
    );
};

export default ProfileModal;