import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import TodoApp from './src/screen';
import { Store } from './src/redux/store';
import AuthProvider from './src/navigations/AuthProvider';
import RootStackNavigation from './src/navigations/RootStackNavigation';

function App () {

    return (
      <Provider store={Store}>
        <AuthProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
              <RootStackNavigation />
            </SafeAreaView>
        </AuthProvider>  
      </Provider>
    );
  };

export default App;