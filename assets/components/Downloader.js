import { Image, View, Text, StyleSheet, Button, FlatList } from "react-native";
import Select from "./Select";
import { useState, useEffect, useRef } from "react";

const Downloader = (props) => {
    const flatListRef = useRef(null);
    let formats = Object.keys(props.links)?.map((f) => {
        return {
            value: f,
            label: `Formato: ${f.toUpperCase()}`,
        };
    });

    const [selectedFormat, setSelectedFormat] = useState(formats[0]?.value);
    const [qualities, setQualities] = useState([]);

    useEffect(() => {
        const formatQuality = (value) => {
            let qs = props.links[value];
            let items = [];
            for (const i in qs) {
                let item = qs[i];
                items.push({
                    token: item.k,
                    quality: item.q,
                    label: item.q_text,
                    size: item.size,
                });
            }
            items = items.sort((a, b) => {
                let q_a = Number(a.quality.replace(/[^0-9.-]/g, "") || "0");
                let q_b = Number(b.quality.replace(/[^0-9.-]/g, "") || "0");
                return q_a - q_b;
            }).map((item, x) => {
                if (item.size == 'MB') {
                    let lastSize = Number(String(items[x - 1]?.size).replace(/[^0-9.-]/g, '') || 0)
                    let nextSize = Number(String(items[x + 1]?.size).replace(/[^0-9.-]/g, '') || 0)
                    item.size = `${(lastSize + nextSize) / 2} MB`
                }
                return item
            });
            return items;
        };

        const newQualities = formatQuality(selectedFormat);
        setQualities(newQualities);

        if (flatListRef.current && newQualities.length > 0) {
            try {
                flatListRef.current.scrollToIndex({ index: 0, animated: false });
            } catch (error) {
                console.log('Error controlado:', error.message)
            }
        }
    }, [props.links, selectedFormat]);

    const onFormatChange = (value) => {
        setSelectedFormat(value);
    };

    const downloadMedia = async (token) => {

        const formdata = new FormData();
        formdata.append("vid", props.id);
        formdata.append("k", token);

        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        let res = await fetch('https://tomp3.cc/api/ajax/convert', requestOptions)
        let data = await res.json()

        let link = data.dlink
        let name = data.title
        let author = props.author
        let type = data.ftype

        let filename = `${name}.${type}`

        console.log(filename, author)
        // algoritmo o script para guardar el archivo en storage/u2/${type}/${filename}
    }

    const renderItem = ({ item }) => {
        let key = `${item.token}-${item.quality}-${item.size || "any"}`;
        return (
            <View style={Style.downloadButton}>
                <Button
                    key={key}
                    title={`${item.quality} ${item.size ? `[${item.size}]` : ""}`.trim()}
                    color="rgba(3, 141, 232, 255)"
                    onPress={() => downloadMedia(item.token)}/>
            </View>
        );
    };

    return (
        <>
            <Image source={{ uri: props.image }} style={Style.image} />
            <View style={Style.titleContainer}>
                <Text style={Style.author}>{props.author}</Text>
                <Text style={Style.title}>{props.title}</Text>
                <Text style={Style.uri}>{`youtu.be/${props.id}`}</Text>
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
