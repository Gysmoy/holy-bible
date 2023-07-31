import { Alert } from "react-native";
import { PermissionsAndroid } from "react-native";

const StoragePermission = async () => {
    try {
        const grantedWrtie = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Permiso de almacenamiento',
                message: 'La aplicación necesita acceso al almacenamiento para guardar datos.',
                buttonNeutral: 'Preguntar luego',
                buttonNegative: 'Cancelar',
                buttonPositive: 'Aceptar',
            },
        );
        if (grantedWrtie === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Permiso de almacenamiento concedido');
        } else {
            // console.log('Permiso de almacenamiento denegado');
            Alert.alert('Error', 'Debes darnos permiso para acceder a almacenamiento del dispositivo')
        }
    } catch (error) {
        Alert.alert('Error', 'Debes darnos permiso para acceder a almacenamiento del dispositivo')
    }
};

export default StoragePermission