import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

import Banner from './assets/components/Banner';
import Main from './assets/components/Main';
import Tiktok from './assets/rest/Tiktok';
import YouTube from './assets/rest/YouTube';

const App = () => {
  const [processed, setProcessed] = useState(false);
  const [value, setValue] = useState(null);
  const [result, setResult] = useState({});
  const [processing, setProcessing] = useState(false);

  const goHome = () => {
    setProcessed(null);
    setValue(null);
    setResult({});
  };

  const searchVideo = async (query) => {
    setProcessing(true);
    let data = null
    try {
      if (query.includes('tiktok.com') && (query.includes('https://') || query.includes('http://'))) {
        data = await Tiktok(query)
      } else {
        data = await YouTube(query)
      }
      if (!data.status) {
        throw new Error(data.message)
      }
      setResult(data);
      setProcessed(true);
    } catch (error) {
      console.trace(error.message)
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
          setValue={setValue}
          searchVideo={searchVideo}
          setProcessing={setProcessing}
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
