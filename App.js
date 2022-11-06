
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './apps/Navigator/AppNavigator';
import { Provider } from 'react-redux';
import { persistor, store } from './apps/Redux/store/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
