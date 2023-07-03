import { StatusBar } from 'expo-status-bar';
import { Button, Image, Text, View } from 'react-native';
import MenuStyle from '../styles/MenuStyle';
import BibleIcon from '../images/BibleIcon.png';

const MenuView = (props) => {
    return (
        <View style={MenuStyle.container}>
            <Image source={BibleIcon} style={MenuStyle.image} />
            <Text style={MenuStyle.title}>¿Qué deseas abrir?</Text>
            <View style={MenuStyle.buttonContainer}>
                <View style={MenuStyle.buttonWrapper}>
                    <Button title='Biblia' onPress={props.openBible} />
                </View>
                <View style={MenuStyle.buttonWrapper}>
                    <Button title='Himnario' onPress={props.openHymnal} />
                </View>
            </View>
            <StatusBar style='auto' />
        </View>
    )
}

export default MenuView