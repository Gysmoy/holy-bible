import FileReader from "react-native-filereader/FileReader";

const Blob2B64 = async (blob) => {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });
}

export default Blob2B64