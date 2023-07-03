import { Button, Text, View } from "react-native"
import BackButtonStyle from "../styles/BackButtonStyle"

const BackButton = (props) => {
    return (
        <>
            <View style={BackButtonStyle.buttonContainer}>
                <Button title='← Volver' onPress={props.onPress} color='#fd4051' />
            </View>
            <Text style={BackButtonStyle.title}>{props.title}</Text>
        </>
    )
}

export default BackButton