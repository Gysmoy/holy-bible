import React, { useEffect, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Search from "./Search";
import Downloader from "./Downloader";

const Main = ({ processed, result, setValue, searchVideo, setProcessing }) => {

    const scrollViewRef = useRef(null);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0 });
        }
    }, [result]);

    let content = null;

    if (result.type === "search") {
        content = result.list.map((e) => (
            <Search
                id={e.id}
                image={e.image}
                title={e.title}
                uri={e.uri}
                setValue={setValue}
                searchVideo={searchVideo}
            />
        ));
    } else {
        content = (
            <>
                <Downloader
                    media={result.media}
                    setProcessing={setProcessing}
                />
                <View style={Style.hr} />
                <Text style={Style.related}>{result.related.length > 0 ? 'Videos relacionados' : ''}</Text>
                {result.related.map((e) => (
                    <Search
                        id={e.id}
                        image={e.image}
                        title={e.title}
                        uri={e.uri}
                        setValue={setValue}
                        searchVideo={searchVideo}
                    />
                ))}
            </>
        );
    }

    return (
        <ScrollView
            ref={scrollViewRef}
            style={[Style.main, { display: processed ? "flex" : "none" }]}
        >
            {content}
        </ScrollView>
    );
};

const Style = StyleSheet.create({
    hr: {
        height: 1,
        backgroundColor: "rgba(255, 255, 255, .25)",
        margin: 20,
    },
    main: {
        position: "absolute",
        top: 120,
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 20,
        marginBottom: 10,
        gap: 5,
    },
    related: {
        color: "#ffffff",
        marginBottom: 10,
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Main;
