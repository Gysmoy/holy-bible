import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native"
import Logo from '../u2.png'
import { useRef } from "react";

const Banner = ({ searchVideo, value, processed, setValue, goHome, title }) => {
    const inputRef = useRef(null)

    const handleConvert = () => {
        inputRef.current.blur();
        searchVideo(value);
    }

    const handleKeyPress = (event) => {
        if (event.nativeEvent.key === "Enter") {
            handleConvert();
        }
    }

    return (
        <View style={processed ? Style.banner : Style.home}>
            <Image source={Logo} style={{ ...Style.image, display: processed ? 'none' : 'flex' }} />
            <Text style={{ ...Style.title, display: processed ? 'none' : 'flex' }}>U2 by SoDe World</Text>
            <TextInput
                ref={inputRef}
                style={Style.input}
                placeholder="Ingresa una URL o descripción"
                onChangeText={setValue}
                value={value}
                onSubmitEditing={handleConvert}
                onKeyPress={handleKeyPress} />
            <View style={Style.container}>
                <View style={{ borderRadius: 5, overflow: 'hidden' }}>
                    <Button title="🜛 Convertir" onPress={handleConvert} color='rgba(3, 141, 232, 255)' />
                </View>
                <View style={{ borderRadius: 5, overflow: 'hidden', display: processed ? 'flex' : 'none' }} >
                    <Button title='← Volver' onPress={goHome} color='#fd4051' />
                </View>
            </View>
            <Text>{title}</Text>
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
        width: 125,
        height: 125,
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