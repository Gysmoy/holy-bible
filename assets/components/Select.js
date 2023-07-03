import { useState } from "react";
import { Modal, ScrollView, Text, TouchableHighlight, StyleSheet } from "react-native"

const Select = (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(props.options ? props.options[0] : null);

    const onChange = (option) => {
        setModalVisible(false)
        setSelectedOption(option)
        if (props.onChange) props.onChange(option.value)
    }

    return (
        <>
            <TouchableHighlight onPress={() => setModalVisible(true)} style={props.style}>
                <Text>{selectedOption ? `${selectedOption.label} ‣` : '‣'}</Text>
            </TouchableHighlight>
            <Modal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                animationType="slide">
                <ScrollView style={SelectStyle.container}>
                    {
                        props.options?.map((option) => {
                            return <TouchableHighlight
                                key={option.value}
                                onPress={() => onChange(option)} style={SelectStyle.option}>
                                <Text>{option.label}</Text>
                            </TouchableHighlight>
                        })
                    }
                </ScrollView>
            </Modal>
        </>
    )
}

const SelectStyle = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#ebeff2'
    },
    option: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 5,
    }
})

export default Select