import { Alert, Platform } from "react-native";
import RNFS from 'react-native-fs';

class SaveFile {
  static createDirectory = async () => {
    const downloadDir =
      Platform.OS === 'ios'
        ? RNFS.DocumentDirectoryPath
        : `${RNFS.CachesDirectoryPath}/downloads/`;

    try {
      await RNFS.mkdir(downloadDir);
    } catch (error) {
      throw error
    }
  };

  static byURI = async (uri, filename) => {
    try {
      await SaveFile.createDirectory(); // Ensure the directory exists

      const res = await fetch(uri);
      const blob = await res.blob();

      const downloadDir =
        Platform.OS === 'ios'
          ? RNFS.DocumentDirectoryPath
          : `${RNFS.CachesDirectoryPath}/downloads/`;

      const fileURI = `${downloadDir}${filename}`;

      await RNFS.writeFile(fileURI, blob);
    } catch (error) {
      throw error;
    }
  };
}

export default SaveFile;
