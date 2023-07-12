import React, {useEffect} from 'react';
import { SafeAreaView } from 'react-native';
import { Navigation } from './src/navigation';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {

  useEffect(()=>{

  },[]);

  return (
    <SafeAreaView style={{flex:1}}>
      <Provider store={store}>
      <Navigation/>
      </Provider>
    </SafeAreaView>
  )
}

export default App;