import RNFS from 'react-native-fs';
import Blob2B64 from './Blob2B64';

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
      blob.name = filename
      blob.lastModifiedDate = new Date()

      const base64 = await Blob2B64(blob)

      const downloadDir = `${RNFS.ExternalStorageDirectoryPath}/Android/data/com.sodeworld.u2/files/Download/`;

      const fileURI = `${downloadDir}${filename}`;

      await RNFS.writeFile(fileURI, base64, 'base64');
      return fileURI
    } catch (error) {
      throw error;
    }
  };
}

export default SaveFile;
