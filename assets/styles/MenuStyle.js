import { StyleSheet } from "react-native";

const MenuStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 75,
        marginBottom: 60,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonWrapper: {
        marginHorizontal: 10,
        width: 100,
        borderRadius: 20,
        overflow: 'hidden'
    }
});

export default MenuStyle