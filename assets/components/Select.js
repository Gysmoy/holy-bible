import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const Select = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(props.options ? props.options[0] : null);

    const onChange = (option) => {
        setModalVisible(false);
        setSelectedOption(option);
        if (props.onChange) props.onChange(option.value);
    };

    const screenHeight = Dimensions.get("window").height;

    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={[SelectStyle.selectButton, props.style]}>
                <Text style={SelectStyle.selectButtonText}>{selectedOption ? `${selectedOption.label} ‣` : "‣"}</Text>
            </TouchableOpacity>
            <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)} animationType="slide">
                <ScrollView style={SelectStyle.container}>
                    <ScrollView contentContainerStyle={[SelectStyle.optionContainer, { minHeight: screenHeight * 0.5 }]}>
                        <Text style={SelectStyle.placeholderText}></Text>
                        {props.options?.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                onPress={() => onChange(option)}
                                style={[
                                    SelectStyle.option,
                                    option.value === selectedOption?.value && SelectStyle.selectedOption,
                                ]}
                            >
                                <Text style={SelectStyle.optionText}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                        <Text style={SelectStyle.placeholderText}></Text>
                    </ScrollView>
                </ScrollView>
            </Modal>
        </>
    );
};

const SelectStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1a202c",
    },
    optionContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
    },
    selectButton: {
        backgroundColor: "#ffffff",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        marginBottom: 5,
    },
    selectButtonText: {
        color: "#ffffff",
        fontSize: 16,
    },
    option: {
        backgroundColor: "rgba(255, 255, 255, 0.125)",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginBottom: 5,
    },
    optionText: {
        color: "#ffffff",
    },
    selectedOption: {
        backgroundColor: "rgba(3, 141, 232, 255)",
    },
    placeholderText: {
        color: "transparent",
        fontSize: 16,
        lineHeight: 20,
    },
});

export default Select;
