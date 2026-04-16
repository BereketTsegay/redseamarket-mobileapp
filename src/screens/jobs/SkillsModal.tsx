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

export const SkillsModal = ({
    visible,
    onClose,
}: {
    visible: boolean;
    onClose: () => void;
}) => {
    const [skillInput, setSkillInput] = useState("");
    const [skills, setSkills] = useState<string[]>([]);

    // ✅ ADD SKILL
    const addSkill = (text: string) => {
        const formatted = text.trim();

        if (!formatted) return;

        // prevent duplicate
        if (skills.includes(formatted)) {
            setSkillInput("");
            return;
        }

        setSkills(prev => [...prev, formatted]);
        setSkillInput("");
    };

    // ✅ REMOVE SKILL
    const removeSkill = (index: number) => {
        const updated = [...skills];
        updated.splice(index, 1);
        setSkills(updated);
    };

    // ✅ HANDLE INPUT (ENTER / COMMA)
    const handleChange = (text: string) => {
        if (text.includes(",") || text.includes("\n")) {
            const split = text.split(/,|\n/);

            split.forEach(item => addSkill(item));
            setSkillInput("");
        } else {
            setSkillInput(text);
        }
    };

    return (
        <ModalWrapper visible={visible} onClose={onClose} title="Skills">

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* 🔥 DESCRIPTION */}
                <Text style={styles.sectionDesc}>
                    Add your technical or soft skills such as Salesforce, Communication skills etc.
                </Text>

                {/* 🧠 INPUT */}
                <View style={styles.fieldBox}>
                    <Text style={styles.label}>Enter the skills you have</Text>

                    <TextInput
                        value={skillInput}
                        onChangeText={handleChange}
                        placeholder="Type skill and press comma or enter"
                        placeholderTextColor={'#b2afaf'}
                        style={styles.input}
                        returnKeyType="done"
                        onSubmitEditing={() => addSkill(skillInput)}
                    />
                </View>

                {/* 🏷 SKILLS LIST */}
                <View style={styles.skillWrap}>
                    {skills.map((item, index) => (
                        <View key={index} style={styles.skillChip}>
                            <Text style={styles.skillText}>{item}</Text>

                            <TouchableOpacity onPress={() => removeSkill(index)}>
                                <Text style={styles.skillRemove}>✕</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* 🔘 ACTIONS */}
            <View style={styles.actionRow}>

                <TouchableOpacity
                    style={styles.clearBtn}
                    onPress={() => setSkills([])}
                >
                    <Text style={styles.clearText}>Clear</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveBtn} onPress={onClose}>
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>

            </View>



        </ModalWrapper>
    );
};