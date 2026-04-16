import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import ModalWrapper from "./ModalWrapper";
import styles from "./styles";
import InputField from "../../components/InputField";
import { CountryPicker } from "react-native-country-codes-picker";

export const BasicInfoModal = ({
    visible,
    onClose,
}: {
    visible: boolean;
    onClose: () => void;
}) => {
    const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState("john@gmail.com");

    // ✅ FIXED PHONE STRUCTURE
    const [phone, setPhone] = useState("9876543210");
    const [dialCode, setDialCode] = useState("+91");

    // ✅ FIXED NATIONALITY
    const [nationality, setNationality] = useState("India");

    const [visa, setVisa] = useState("Business");
    const [gender, setGender] = useState("Male");
    const [language, setLanguage] = useState("English, Hindi");

    const [showPicker, setShowPicker] = useState(false);

    return (
        <ModalWrapper visible={visible} onClose={onClose} title="Basic Info">
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* 👤 NAME */}
                <InputField
                    label={"Full Name"}
                    title={"Enter your name"}
                    value={name}
                    onChange={setName}
                />

                {/* 📧 EMAIL */}
                <InputField
                    label={"Email"}
                    title={"Enter your email"}
                    value={email}
                    onChange={setEmail}
                />

                {/* 📞 PHONE (FIXED) */}
                <View style={styles.fieldBox}>
                    <Text style={styles.label}>Phone Number</Text>

                    <View style={{ flexDirection: "row" }}>
                        {/* Dial Code */}
                        <TouchableOpacity
                            onPress={() => setShowPicker(true)}
                            style={[styles.input, { marginRight: 8, justifyContent: "center" }]}
                        >
                            <Text>{dialCode}</Text>
                        </TouchableOpacity>

                        {/* Phone Number */}
                        <TextInput
                            value={phone}
                            onChangeText={setPhone}
                            style={[styles.input, { flex: 1 }]}
                            keyboardType="phone-pad"
                            placeholder="Enter number"
                            textAlignVertical="center"
                        />
                    </View>
                </View>

                {/* 🌍 NATIONALITY (FIXED) */}
                <View style={styles.fieldBox}>
                    <Text style={styles.label}>Nationality</Text>

                    <TouchableOpacity
                        style={[styles.input, { justifyContent: "center" }]}
                        onPress={() => setShowPicker(true)}
                    >
                        <Text>{nationality || "Select country"}</Text>
                    </TouchableOpacity>
                </View>

                {/* 🟢 VISA */}
                <View style={styles.fieldBox}>
                    <Text style={styles.label}>Visa Type</Text>

                    <View style={styles.radioRow}>
                        {["Business", "Employment", "Other"].map((item) => (
                            <TouchableOpacity
                                key={item}
                                onPress={() => setVisa(item)}
                                style={[
                                    styles.radioBox,
                                    visa === item && styles.radioActive,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.radioText,
                                        visa === item && styles.radioTextActive,
                                    ]}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* ⚧ GENDER */}
                <View style={styles.fieldBox}>
                    <Text style={styles.label}>Gender</Text>

                    <View style={styles.radioRow}>
                        {["Male", "Female", "Other"].map((item) => (
                            <TouchableOpacity
                                key={item}
                                onPress={() => setGender(item)}
                                style={[
                                    styles.radioBox,
                                    gender === item && styles.radioActive,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.radioText,
                                        gender === item && styles.radioTextActive,
                                    ]}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* 🗣 LANGUAGES */}
                <View style={styles.fieldBox}>
                    <Text style={styles.label}>Languages Spoken</Text>
                    <TextInput
                        value={language}
                        onChangeText={setLanguage}
                        style={styles.input}
                        placeholder="e.g. English, Hindi"
                    />
                </View>

            </ScrollView>

            {/* 🔘 ACTIONS */}
            <View style={styles.actionRow}>
                <TouchableOpacity style={styles.clearBtn} onPress={onClose}>
                    <Text style={styles.clearText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveBtn} onPress={onClose}>
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            </View>

            {/* 🌍 COUNTRY PICKER (FIXED) */}
            <CountryPicker
                show={showPicker}
                lang="en"
                pickerButtonOnPress={(item) => {
                    setNationality(item.name.en);
                    setDialCode(item.dial_code);
                    setShowPicker(false);
                }}
                onBackdropPress={() => setShowPicker(false)}
                inputPlaceholder="Search country"
                style={{
                    modal: {
                        backgroundColor: "white",
                        height: "60%",
                    },
                    textInput: {
                        color: "black",
                    },
                }}
            />
        </ModalWrapper>
    );
};