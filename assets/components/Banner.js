import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native"
import Logo from '../images/u2.icon.png'
import { useRef } from "react";

const Banner = (props) => {

    const inputRef = useRef(null)

    const handleConvert = () => {
        inputRef.current.blur();
        props.searchVideo(props.value);
    }

    const handleKeyPress = (event) => {
        console.log(event.nativeEvent)
        if (event.nativeEvent.key === "Enter") {
            handleConvert();
        }
    }

    return (
        <View style={props.processed ? Style.banner : Style.home}>
            <Image source={Logo} style={{ ...Style.image, display: props.processed ? 'none' : 'flex' }} />
            <Text style={{ ...Style.title, display: props.processed ? 'none' : 'flex' }}>U2 by SoDe World</Text>
            <TextInput
                ref={inputRef}
                style={Style.input}
                placeholder="Ingresa una URL o descripción"
                onChangeText={props.setValue}
                value={props.value}
                onSubmitEditing={handleConvert}
                onKeyPress={handleKeyPress} />
            <View style={Style.container}>
                <View style={{ borderRadius: 5, overflow: 'hidden' }}>
                    <Button title="🜛 Convertir" onPress={handleConvert} color='rgba(3, 141, 232, 255)' />
                </View>
                <View style={{ borderRadius: 5, overflow: 'hidden', display: props.processed ? 'flex' : 'none' }} >
                    <Button title='← Volver' onPress={props.goHome} color='#fd4051' />
                </View>
            </View>
            <Text>{props.title}</Text>
        </View>
    )
}

const Style = StyleSheet.create({
    home: {
        position: 'absolute',
        left: 0,
        right: 0,
        padding: 20,
        gap: 10
    },
    banner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 20,
        gap: 10
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    title: {
        alignSelf: 'center',
        color: '#ffffff',
        fontSize: 20,
        marginBottom: 20
    },
    input: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        fontSize: 18
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    }
})

export default Banner