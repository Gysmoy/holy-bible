import { Platform } from "react-native";
import RNFS from 'react-native-fs';

class SaveFile {
  static byURI = async (uri, filename) => {
    try {
      const res = await fetch(uri);
      const arrayBuffer = await res.arrayBuffer();

      const bufferObject = Buffer.from(arrayBuffer);
      const base64 = bufferObject.toString('base64');

      const downloadDir =
        Platform.OS === 'ios'
          ? RNFS.DocumentDirectoryPath
          : RNFS.CachesDirectoryPath + '/downloads/';

      const fileURI = `${downloadDir}${filename}`;

      await RNFS.writeFile(fileURI, base64, 'base64');
    } catch (error) {
      throw error;
    }
  }
}

export default SaveFile;
