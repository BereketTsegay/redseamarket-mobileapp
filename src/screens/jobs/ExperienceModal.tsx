import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import ModalWrapper from "./ModalWrapper";
import styles from "./styles";
import InputField from "../../components/InputField";
import ItemDropdown from "../../components/ItemDropdown";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export const ExperienceModal = ({
    visible,
    onClose,
}: {
    visible: boolean;
    onClose: () => void;
}) => {

    // ✅ TYPE
    const [type, setType] = useState<"fresher" | "experienced">("experienced");

    // ✅ FIELDS
    const [jobTitle, setJobTitle] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");

    const [category, setCategory] = useState<any>(null);
    const [industry, setIndustry] = useState<any>(null);
    const [country, setCountry] = useState<any>(null);

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [currentlyWorking, setCurrentlyWorking] = useState(false);

    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const { countryLists } = useSelector(
        (state: RootState) => state.CountryList,
    );

    // ✅ MOCK DATA (replace with API later)
    const jobCategories = [
        { id: "1", name: "IT" },
        { id: "2", name: "Finance" },
    ];

    const industries = [
        { id: "1", name: "Software" },
        { id: "2", name: "Banking" },
    ];

    const formatDate = (date: Date | null) => {
        if (!date) return "";
        return date.toLocaleDateString();
    };

    return (
        <ModalWrapper visible={visible} onClose={onClose} title="Experience">

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* 🔥 DESCRIPTION */}
                <Text style={styles.sectionDesc}>
                    Add your current and past work experiences.
                </Text>

                {/* 👤 TYPE */}
                <View style={styles.fieldBox}>
                    <Text style={styles.label}>Experience Type</Text>

                    <View style={styles.radioRow}>
                        {["fresher", "experienced"].map((item) => (
                            <TouchableOpacity
                                key={item}
                                onPress={() => setType(item as any)}
                                style={[
                                    styles.radioBox,
                                    type === item && styles.radioActive,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.radioText,
                                        type === item && styles.radioTextActive,
                                    ]}
                                >
                                    {item === "fresher" ? "Fresher" : "Experienced"}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* 👔 JOB TITLE */}
                <InputField
                    label={"Job Title"}
                    title={"Enter job title"}
                    value={jobTitle}
                    onChange={setJobTitle}
                />

                {/* 📂 CATEGORY */}
                <View>
                    <Text style={styles.label}>Job Category</Text>

                    <ItemDropdown
                        value={category}
                        data={jobCategories}
                        add={(val: any) => setCategory(val)}
                        dropdownType={"Category"}
                    />
                </View>

                {/* 🏭 INDUSTRY */}
                <View>
                    <Text style={styles.label}>Industry</Text>

                    <ItemDropdown
                        value={industry}
                        data={industries}
                        add={(val: any) => setIndustry(val)}
                        dropdownType={"Industry"}
                    />
                </View>

                {/* 🏢 COMPANY */}
                <InputField
                    label={"Company"}
                    title={"Enter company name"}
                    value={company}
                    onChange={setCompany}
                />

                {/* 🌍 COUNTRY */}
                <View style={styles.fieldBox}>
                    <Text style={styles.label}>Country</Text>

                    <ItemDropdown
                        value={country}
                        data={countryLists?.data || []}
                        add={(val: any) => setCountry(val)}
                        dropdownType={"Country"}
                    />
                </View>

                {/* 📝 DESCRIPTION */}
                <InputField
                    label={"Job Description"}
                    title={"Describe your role"}
                    value={description}
                    onChange={setDescription}
                    multiline
                    height={90}
                />

                {/* 📅 DATES */}
                <View style={{ flexDirection: "row", gap: 10 }}>

                    {/* START YEAR */}
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Start Date</Text>

                        <TouchableOpacity
                            style={[styles.input, { justifyContent: "center" }]}
                            onPress={() => setShowStartPicker(true)}
                        >
                            <Text>
                                {startDate ? formatDate(startDate) : "dd/mm/yyyy"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* END YEAR */}
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>End Date</Text>

                        <TouchableOpacity
                            style={[styles.input, { justifyContent: "center" }]}
                            onPress={() => setShowEndPicker(true)}
                            disabled={currentlyWorking}
                        >
                            <Text>
                                {currentlyWorking
                                    ? "Present"
                                    : endDate
                                        ? formatDate(endDate)
                                        : "dd/mm/yyyy"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

                {/* ✅ CURRENTLY WORKING */}
                <TouchableOpacity
                    style={{ marginVertical: 10 }}
                    onPress={() => setCurrentlyWorking(!currentlyWorking)}
                >
                    <Text style={{ color: currentlyWorking ? "#2563EB" : "#667085" }}>
                        {currentlyWorking ? "☑" : "☐"} Currently Working Here
                    </Text>
                </TouchableOpacity>

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



            {/* 📅 PICKERS */}
            <DateTimePickerModal
                isVisible={showStartPicker}
                mode="date"
                onConfirm={(date) => {
                    setStartDate(date);
                    setShowStartPicker(false);
                }}
                onCancel={() => setShowStartPicker(false)}
            />

            <DateTimePickerModal
                isVisible={showEndPicker}
                mode="date"
                onConfirm={(date) => {
                    setEndDate(date);
                    setShowEndPicker(false);
                }}
                onCancel={() => setShowEndPicker(false)}
            />

        </ModalWrapper>
    );
};