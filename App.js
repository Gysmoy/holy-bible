import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';

import Banner from './assets/components/Banner';
import Main from './assets/components/Main';

const App = () => {
  const [processed, setProcessed] = useState(false);
  const [value, setValue] = useState(null);
  const [result, setResult] = useState({});
  const [links, setLinks] = useState([]);
  const [processing, setProcessing] = useState(false);

  const goHome = () => {
    setProcessed(null);
    setValue(null);
    setResult({});
  };

  const searchVideo = async (query) => {
    setProcessing(true);
    try {
      const formdata = new FormData();
      formdata.append("query", query);
      formdata.append("vt", "downloader");

      const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      const res = await fetch('https://tomp3.cc/api/ajax/search', requestOptions);
      const data = await res.json();

      setLinks(data.links ?? []);
      setResult(data);
      setProcessed(true);
    } catch (error) {
      console.error("Error occurred while searching video:", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <View style={styles.main}>
      <Banner
        processed={processed}
        setProcessed={setProcessed}
        value={value}
        setValue={setValue}
        setResult={setResult}
        goHome={goHome}
        searchVideo={searchVideo}
      />
      {processed && (
        <Main
          processed={processed}
          result={result}
          links={links}
          setValue={setValue}
          searchVideo={searchVideo}
        />
      )}
      {processing && (
        <View style={styles.loader}>
          <Text style={styles.loaderText}>Cargando...</Text>
        </View>
      )}
      <StatusBar style='auto' backgroundColor='#1a202c' />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#1a202c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, .75)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loaderText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18
  }
});

export default App;
