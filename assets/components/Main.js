import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import Search from "./Search"

const Main = (props) => {
    const getURI = (id) => {
        return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
    }
    return (
        <ScrollView style={{ ...Style.main, display: props.processed ? 'flex' : 'none' }}>
            {
                props.result.p === 'search'
                    ? props.result.items.map(e => <Search id={e.v} title={e.t} uri={getURI(e.v)} setValue={props.setValue} searchVideo={props.searchVideo}/>)
                    : <>
                        <Image key={props.id} source={{ uri: getURI(props.result.vid) }} style={Style.image} />
                        <View style={Style.titleContainer}>
                            <Text style={Style.title}>{props.result.title}</Text>
                            <Text style={Style.uri}>{`youtu.be/${props.result.vid}`}</Text>
                        </View>
                        <View style={Style.hr}/>
                    </>

            }
        </ScrollView>
    )
}

const Style = StyleSheet.create({
    hr: {
        height: 1,
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, .25)',
        margin: 20
    },
    main: {
        position: 'absolute',
        top: 120,
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 20,
        paddingVertical: 0,
        marginBottom: 10,
        gap: 5
    },
    image: {
        alignSelf: 'center',
        width: 240,
        height: 180,
        borderRadius: 5
    },
    title: {
        marginTop: 10,
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    uri: {
        color: 'rgba(255, 255, 255, .75)',
        textAlign: 'center',
        fontSize: 14,
        marginTop: 5
    }
})

export default Main