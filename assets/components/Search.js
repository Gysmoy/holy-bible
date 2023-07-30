import React from 'react';
import { Clipboard, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Search = ({id, image, title, uri, setValue, searchVideo}) => {
    const onClick = () => {
        setValue(id);
        searchVideo(id);
    };

    const onCopy = () => {
        Clipboard.setString(id);
    };

    return (
        <TouchableOpacity style={styles.container} onPress={onClick}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.uri} onPress={onCopy}>{uri}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.0625)',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 5,
        padding: 10,
    },
    image: {
        width: 80,
        height: 60,
        borderRadius: 5,
    },
    titleContainer: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    uri: {
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 14,
    },
});

export default Search;
