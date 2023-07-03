import { Button, View, ScrollView, Text, AppRegistry } from "react-native"
import BackButton from "../components/BackButton"
import BibleViewStyle from "../styles/BibleViewStyle"
import BibleBooks from '../sources/BibleBooks.json'
import React, { useState } from "react"
import Select from "../components/Select"
// import { readFileAssets } from "react-native-fs"

const BibleView = (props) => {
    const [book, setBook] = useState(null);

    const openBook = async (bibleBook) => {
        setBook(bibleBook)
        // AppRegistry.registerComponent('react-native-fs')
        // let data = await readFileAssets(`sources/${bibleBook.key}.json`, 'utf8');
        console.log(data)
        console.log(bibleBook)
    }

    const setChapter = (chapter) => {
        console.log(chapter)
    }

    const goBack = () => {
        setBook(null)
    }

    let block = null;

    if (book) {
        return (
            <>
                <BackButton onPress={goBack} title={book.title} />
                <ScrollView style={BibleViewStyle.main}>
                    <Select onChange={setChapter} options={[...Array(book.chapters)].map((_, i) => {
                        return { value: i + 1, label: `Capítulo ${i + 1}` }
                    })} style={BibleViewStyle.select} />
                </ScrollView>
            </>
        )
    } else {
        return (
            <>
                <BackButton onPress={props.openMenu} title='Biblia' />
                <ScrollView style={BibleViewStyle.main}>

                    {BibleBooks.map(bibleBook => {
                        let blockContainer = ''
                        if (block != bibleBook.testament) {
                            block = bibleBook.testament
                            blockContainer = <Text style={BibleViewStyle.block}>{block === 'A.T.' ? 'Antiguo testamento' : 'Nuevo testamento'}</Text>
                        } else {
                            blockContainer = null
                        }
                        return (
                            <>
                                {blockContainer}
                                <View key={bibleBook.key + '_container'} style={BibleViewStyle.container}>
                                    <Text style={BibleViewStyle.title}>{bibleBook.shortTitle + ' '}
                                        <Text style={{ fontWeight: 'normal' }}>({bibleBook.category})</Text>
                                    </Text>
                                    <Text style={BibleViewStyle.description}>{bibleBook.title}</Text>
                                    <Text style={BibleViewStyle.details}>{bibleBook.chapters} capitulos • {bibleBook.verses} versículos</Text>
                                    <View style={BibleViewStyle.buttonContainer}>
                                        <Button key={bibleBook.key} title='Abrir →' color='#038de8' onPress={() => openBook(bibleBook)} />
                                    </View>
                                </View>
                            </>
                        )
                    })}
                </ScrollView>
            </>
        )
    }
}

export default BibleView