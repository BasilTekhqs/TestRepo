/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import {View, StatusBar} from 'react-native';
import MainApp from './navigation/main-container';
import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import store from './redux/store/index';
import '@react-native-firebase/messaging';

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <StatusBar
          animated={true}
          backgroundColor="#fff"
          barStyle="dark-content"
          showHideTransition="fade"
          hidden={false}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            // justifyContent: 'center',
            // alignItems: 'center',
          }}
        >
          {/* <TabNavigator /> */}
          <MainApp />
        </View>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
