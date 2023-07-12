import { Clipboard, Image, StyleSheet, Text, View } from 'react-native'

const Search = (props) => {
    const onClick = (id) => {
        props.setValue(`https://youtu.be/${id}`)
        props.searchVideo(`https://youtu.be/${id}`)
    }
    const onCopy = () => {
        let uriToCopy = `https://youtu.be/${props.id}`
        Clipboard.setString(uriToCopy)
    }
    return (
        <View style={Style.container}>
            <Image source={{ uri: props.uri }} style={Style.image} />
            <View style={Style.titleContainer}>
                <Text style={Style.title} onPress={() => onClick(props.id)}>{props.title}</Text>
                <Text style={Style.uri} onPress={onCopy}>{`youtu.be/${props.id}`}</Text>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.0625)',
        color: '#ffffff',
        flex: 1,
        verticalAlign: 'middle',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 5,
        padding: 10,
        flexDirection: "row",
        gap: 10
    },
    image: {
        width: 80,
        height: 60,
        borderRadius: 5
    },
    titleContainer: {
        flex: 1
    },
    title: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16
    },
    uri: {
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 14
    }
})

export default Search