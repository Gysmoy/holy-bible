import { Image, View, Text, StyleSheet, Button, FlatList, Linking, Alert } from "react-native";
import Select from "./Select";
import { useState, useEffect, useRef } from "react";
import '../extends/string.extend'
import StoragePermission from "../utils/StoragePermission";

const Downloader = ({ media, setProcessing }) => {
    const flatListRef = useRef(null);
    let formats = media.formats
    const [selectedFormat, setSelectedFormat] = useState(formats[0]?.value);
    const [qualities, setQualities] = useState([]);

    useEffect(() => {
        const newQualities = media.links[selectedFormat];
        setQualities(newQualities);

        if (flatListRef.current && newQualities.length > 0) {
            try {
                flatListRef.current.scrollToIndex({ index: 0, animated: false });
            } catch (error) {
                console.log('Error controlado:', error.message)
            }
        }
    }, [media.links, selectedFormat]);

    const onFormatChange = (value) => {
        setSelectedFormat(value);
    };

    const onDownloadClick = async (item) => {
        setProcessing(true)
        await StoragePermission()
        let { status, message, link } = await item.callback()
        if (!status) {
            Alert.alert('Error', message)
            Linking.openURL(link)
                .catch((error) => {
                    console.error('Error al abrir el enlace:', error);
                });
        } else {
            Alert.alert('Correcto', 'El archivo se ha guardado correctamente')
        }
        setProcessing(false)
    }

    const renderItem = ({ item }) => {
        return (
            <View style={Style.downloadButton}>
                <Button
                    title={item.label}
                    color="rgba(3, 141, 232, 255)"
                    onPress={() => { onDownloadClick(item) }} />
            </View>
        );
    };

    return (
        <>
            <Image source={{ uri: media.image }} style={Style.image} />
            {media.avatar ? <Image source={{ uri: media.avatar }} style={Style.avatar} /> : ''}
            <View style={Style.titleContainer}>
                <Text style={Style.author}>{media.author || 'Sin autor'}</Text>
                <Text style={Style.title}>{(media.description || 'Sin descripción').reduce(128)}</Text>
                <Text style={Style.uri}>{media.link}</Text>
            </View>
            <Select options={formats} style={Style.select} onChange={onFormatChange} />
            <FlatList
                ref={flatListRef}
                data={qualities}
                horizontal
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.token}-${index}`}
                style={Style.downloadButtonContainer}
                contentContainerStyle={qualities.length > 0 ? null : Style.emptyContentContainer}
            />
        </>
    );
};

const Style = StyleSheet.create({
    image: {
        alignSelf: "center",
        width: 240,
        height: 150,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.0625)'
    },
    avatar: {
        position: 'absolute',
        top: 5,
        borderRadius: 25,
        overflow: 'hidden',
        alignSelf: "center",
        width: 52,
        height: 52,
        borderWidth: 2,
        borderColor: '#ffffff',
        backgroundColor: 'rgba(255, 255, 255, 0.0625)'
    },
    title: {
        textAlign: "center",
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
    },
    author: {
        marginTop: 10,
        color: "rgba(3, 141, 232, 255)",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    },
    uri: {
        color: "rgba(255, 255, 255, .75)",
        textAlign: "center",
        fontSize: 12,
        marginTop: 5,
    },
    select: {
        alignSelf: "center",
        backgroundColor: "rgba(16,196,105, 255)",
        borderRadius: 5,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginTop: 10,
    },
    downloadButton: {
        alignSelf: "flex-start",
        marginHorizontal: 2.5,
        borderRadius: 15,
        overflow: "hidden",
    },
    downloadButtonContainer: {
        marginTop: 10,
    },
    emptyContentContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Downloader;
