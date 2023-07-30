import { Platform } from "react-native";
import RNFS from 'react-native-fs';

class SaveFile {
  static byURI = async (uri, filename) => {
    try {
      const res = await fetch(uri);
      const blob = await res.blob();

      const downloadDir =
        Platform.OS === 'ios'
          ? RNFS.DocumentDirectoryPath
          : RNFS.CachesDirectoryPath + '/downloads/';

      const fileURI = `${downloadDir}${filename}`;

      await RNFS.writeFile(fileURI, blob);
    } catch (error) {
      throw error;
    }
  }
}

export default SaveFile;
