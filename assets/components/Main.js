import React, { useEffect, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Search from "./Search";
import Downloader from "./Downloader";

const Main = (props) => {
    const scrollViewRef = useRef(null);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0 });
        }
    }, [props.result]);

    const getURI = (id) => {
        return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    };

    let content = null;

    if (props.result.p === "search") {
        content = props.result.items.map((e) => (
            <Search
                key={e.v}
                id={e.v}
                title={e.t}
                uri={getURI(e.v)}
                setValue={props.setValue}
                searchVideo={props.searchVideo}
            />
        ));
    } else if (props.result.related && props.result.related.length > 0) {
        content = (
            <>
                <Downloader
                    id={props.result.vid}
                    title={props.result.title}
                    author={props.result.a}
                    image={getURI(props.result.vid)}
                    links={props.links}
                />
                <View style={Style.hr} />
                <Text style={Style.related}>Videos relacionados</Text>
                {props.result.related[0].contents.map((e) => (
                    <Search
                        key={e.vid}
                        id={e.vid}
                        title={e.title}
                        uri={getURI(e.vid)}
                        setValue={props.setValue}
                        searchVideo={props.searchVideo}
                    />
                ))}
            </>
        );
    }

    return (
        <ScrollView
            ref={scrollViewRef}
            style={[Style.main, { display: props.processed ? "flex" : "none" }]}
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
