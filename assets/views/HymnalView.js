import { View } from "react-native"
import BackButton from "../components/BackButton"

const HymnalView = (props) => {
    return (
        <>
            <BackButton onPress={props.openMenu} title='Himnario'/>
            <View></View>
        </>
    )
}

export default HymnalView