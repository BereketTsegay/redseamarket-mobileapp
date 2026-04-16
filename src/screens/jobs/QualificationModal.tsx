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

export const QualificationModal = ({
    visible,
    onClose,
}: {
    visible: boolean;
    onClose: () => void;
}) => {

    // ✅ STATES
    const [degree, setDegree] = useState<any>(null);
    const [country, setCountry] = useState<any>(null);

    const [specialization, setSpecialization] = useState("");
    const [university, setUniversity] = useState("");

    const [startYear, setStartYear] = useState<Date | null>(null);
    const [endYear, setEndYear] = useState<Date | null>(null);

    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const { countryLists } = useSelector(
        (state: RootState) => state.CountryList,
    );

    // ✅ FORMAT DEGREE DATA
    const degrees = [
        { id: "1", name: "High School" },
        { id: "2", name: "Diploma" },
        { id: "3", name: "B.Tech" },
        { id: "4", name: "B.Sc" },
        { id: "5", name: "MBA" },
        { id: "6", name: "M.Tech" },
        { id: "7", name: "PhD" },
    ];

    // ✅ FORMAT DATE
    const formatYear = (date: Date | null) => {
        if (!date) return "";
        return date.getFullYear().toString();
    };

    return (
        <ModalWrapper visible={visible} onClose={onClose} title="Qualification">

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* 🔥 DESCRIPTION */}
                <Text style={styles.sectionDesc}>
                    Add your academic qualification details such as School, Undergrad and Post graduation degree.
                </Text>

                {/* 🎓 DEGREE */}
                <View>
                    <Text style={styles.label}>Degree</Text>

                    <ItemDropdown
                        value={degree}
                        data={degrees}
                        add={(val: any) => setDegree(val)}
                        dropdownType={"Degree"}
                    />
                </View>

                {/* 🧠 SPECIALIZATION */}
                <InputField
                    label={"Specialization"}
                    title={"Enter specialization"}
                    value={specialization}
                    onChange={setSpecialization}
                />

                {/* 🏫 UNIVERSITY */}
                <InputField
                    label={"University"}
                    title={"Enter university name"}
                    value={university}
                    onChange={setUniversity}
                />

                {/* 🌍 COUNTRY */}
                <View>
                    <Text style={styles.label}>Country</Text>

                    <ItemDropdown
                        value={country}
                        data={countryLists?.data || []}
                        add={(val: any) => setCountry(val)}
                        dropdownType={"Country"}
                    />
                </View>

                {/* 📅 YEARS (DATE PICKER) */}
                <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>

                    {/* START YEAR */}
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Start Yr. of Graduation</Text>

                        <TouchableOpacity
                            style={[styles.input, { justifyContent: "center" }]}
                            onPress={() => setShowStartPicker(true)}
                        >
                            <Text style={{ color: startYear ? "#000" : "#999" }}>
                                {startYear ? formatYear(startYear) : "dd/mm/yyyy"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* END YEAR */}
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>End Yr. of Graduation</Text>

                        <TouchableOpacity
                            style={[styles.input, { justifyContent: "center" }]}
                            onPress={() => setShowEndPicker(true)}
                        >
                            <Text style={{ color: endYear ? "#000" : "#999" }}>
                                {endYear ? formatYear(endYear) : "dd/mm/yyyy"}
                            </Text>
                        </TouchableOpacity>
                    </View>

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

            {/* 📅 START PICKER */}
            <DateTimePickerModal
                isVisible={showStartPicker}
                mode="date"
                onConfirm={(date) => {
                    setStartYear(date);
                    setShowStartPicker(false);
                }}
                onCancel={() => setShowStartPicker(false)}
            />

            {/* 📅 END PICKER */}
            <DateTimePickerModal
                isVisible={showEndPicker}
                mode="date"
                onConfirm={(date) => {
                    setEndYear(date);
                    setShowEndPicker(false);
                }}
                onCancel={() => setShowEndPicker(false)}
            />

        </ModalWrapper>
    );
};