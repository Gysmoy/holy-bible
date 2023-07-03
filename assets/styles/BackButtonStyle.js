import { StyleSheet } from "react-native";

const BackButtonStyle = StyleSheet.create({
    buttonContainer: {
        display: 'flex',
        width: 100,
        position: 'absolute',
        top: 10,
        left: 10,
        borderRadius: 20,
        overflow: 'hidden'
    },
    title: {
        alignSelf: 'flex-end',
        top: 13,
        right: 20,
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default BackButtonStyle