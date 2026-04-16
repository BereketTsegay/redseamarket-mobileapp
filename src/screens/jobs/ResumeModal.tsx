import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import ModalWrapper from "./ModalWrapper";
import styles from "./styles";
import { pick, types, isCancel } from "@react-native-documents/picker";
import { showToast } from "../../constants/commonUtils";

export const ResumeModal = ({
    visible,
    onClose,
}: {
    visible: boolean;
    onClose: () => void;
}) => {
    const [file, setFile] = useState<any>(null);

    // 📂 PICK FILE
    const handlePickFile = async () => {
        try {
            const pickerResult = await pick({
                mode: "open",
                type: [types.pdf, types.doc, types.docx],
            });

            const selected = pickerResult[0];

            // ✅ SIZE VALIDATION (5MB)
            if (selected.size && selected.size > 5 * 1024 * 1024) {
                showToast("File size should be less than 5MB");
                return;
            }

            setFile(selected);
        } catch (err) {
            if (isCancel(err)) {
                // user cancelled
            } else {
                console.log(err);
            }
        }
    };

    const removeFile = () => {
        setFile(null);
    };

    const formatSize = (size: number) => {
        if (!size) return "";
        return (size / 1024 / 1024).toFixed(2) + " MB";
    };

    const getFileType = (name: string = "") => {
        const ext = name.split('.').pop()?.toLowerCase();

        if (ext === 'pdf') return 'PDF';
        if (ext === 'doc') return 'DOC';
        if (ext === 'docx') return 'DOCX';

        return 'FILE';
    };

    const getFileColor = (name: string = "") => {
        const ext = name.split('.').pop()?.toLowerCase();

        if (ext === 'pdf') return '#EF4444';   // red
        if (ext === 'doc') return '#2563EB';   // blue
        if (ext === 'docx') return '#1D4ED8';  // darker blue

        return '#6B7280'; // default gray
    };

    return (
        <ModalWrapper visible={visible} onClose={onClose} title="Upload Resume">

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* 🔥 DESCRIPTION */}
                <Text style={styles.sectionDesc}>
                    Attach your most recent resume file.
                </Text>

                {/* 📦 UPLOAD BOX */}
                {!file ? (
                    <TouchableOpacity
                        style={styles.uploadBox}
                        onPress={handlePickFile}
                    >
                        <Text style={styles.uploadIcon}>☁️</Text>

                        <Text style={styles.uploadTitle}>
                            <Text style={{ fontWeight: "600" }}>
                                Click to upload resume
                            </Text>{" "}
                            or browse
                        </Text>

                        <Text style={styles.uploadSub}>
                            Max 5 MB (.DOC, .DOCX, .PDF)
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.fileCard}>
                        <View
                            style={[
                                styles.fileIconBox1,
                                { backgroundColor: getFileColor(file?.name) },
                            ]}
                        >
                            <Text style={{ color: "#fff", fontSize: 10 }}>
                                {getFileType(file?.name)}
                            </Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={styles.fileName}>{file.name}</Text>
                            <Text style={styles.fileMeta}>
                                {formatSize(file.size)}
                            </Text>
                        </View>

                        <TouchableOpacity onPress={removeFile}>
                            <Text style={styles.delete}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>

            {/* 🔘 ACTIONS */}
            <View style={styles.actionRow}>

                <TouchableOpacity style={styles.clearBtn} onPress={onClose}>
                    <Text style={styles.clearText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.saveBtn,
                        !file && { opacity: 0.5 },
                    ]}
                    disabled={!file}
                    onPress={onClose}
                >
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>

            </View>



        </ModalWrapper>
    );
};