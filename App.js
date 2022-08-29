import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import TodoApp from './src/screen';
import { Store } from './src/redux/store';

function App () {

    return (
      <Provider store={Store}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <TodoApp />
        </SafeAreaView>
      </Provider>
    );
  };

export default App;