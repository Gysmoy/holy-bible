import { StyleSheet } from "react-native";

const BibleViewStyle = StyleSheet.create({
    main: {
        top: 30,
        padding: 10,
        backgroundColor: '#ebeff2',
        marginBottom: 40
    },
    select: {
        backgroundColor: "#fff",
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignSelf: 'center',
        borderRadius: 20
    },
    container: {
        position: 'relative',
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 10
    },
    block: {
        alignSelf: 'center',
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#343a40',
        marginBottom: 5
    },
    description: {
        color: '#6c757d',
        fontSize: 14
    },
    details: {
        fontSize: 12,
        color: '#98a6ad'
    },
    buttonContainer: {
        position: 'absolute',
        right: 10,
        top: 23,
        borderRadius: 10,
        overflow: 'hidden'
    }
});

export default BibleViewStyle