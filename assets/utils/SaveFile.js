import RNFS from 'react-native-fs';

class SaveFile {
  static createDirectory = async () => {
    const downloadDir = `${RNFS.ExternalStorageDirectoryPath}/Android/data/com.sodeworld.u2/files/Download/`;

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

      const downloadDir = `${RNFS.ExternalStorageDirectoryPath}/Android/data/com.sodeworld.u2/files/Download/`;

      const fileURI = `${downloadDir}${filename}`;

      await RNFS.writeFile(fileURI, blob);
      return fileURI
    } catch (error) {
      throw error;
    }
  };
}

export default SaveFile;
