import React, { useState } from 'react';
import Banner from './assets/components/Banner';
import { StatusBar, View } from 'react-native';
import Main from './assets/components/Main';

const App = () => {
  const [processed, setProcessed] = useState(false);
  const [value, setValue] = useState(null);
  const [result, setResult] = useState({});

  const goHome = () => {
    setProcessed(null)
    setValue(null)
    setResult({})
  }

  const searchVideo = async (query) => {
    var formdata = new FormData()
    formdata.append("query", query)
    formdata.append("vt", "downloader")

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    let res = await fetch('https://tomp3.cc/api/ajax/search', requestOptions)
    let data = await res.json();

    setResult(data)
    setProcessed(true)
  }

  return (
    <View style={{ backgroundColor: '#1a202c', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Banner
        processed={processed}
        setProcessed={setProcessed}
        value={value}
        setValue={setValue}
        setResult={setResult}
        goHome={goHome}
        searchVideo={searchVideo} />
      {
        processed
          ? <Main
            processed={processed}
            result={result}
            setValue={setValue}
            searchVideo={searchVideo} />
          : ''
      }
      <StatusBar style='auto' backgroundColor='#1a202c' />
    </View>
  )
};

export default App;
