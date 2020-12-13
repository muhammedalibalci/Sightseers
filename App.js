import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Navigation from './src/navigation/Navigation';
import * as Font from 'expo-font';
import store from './src/store'
import { Provider } from 'react-redux';
import JwtDecode from 'jwt-decode';
import { logout } from './src/store/actions/authAction';
import AsyncStorage from '@react-native-community/async-storage';
import { AUTH_LOADING, AUTH_USER } from './src/store/types';

var dateNow = new Date()

export default function App() {

  React.useEffect(() => {
    readToken();
  }, [])

  const readToken = async () => {
    store.dispatch({ type: AUTH_LOADING, payload: true })
    try {
      const value = await AsyncStorage.getItem('token');

      if (value !== null) {
        const decodeToken = JwtDecode(value);

        if (decodeToken.exp < dateNow.getDate()) {
          store.dispatch(logout());
        }

        store.dispatch({
          type: AUTH_USER,
          payload: { id: decodeToken.sub }
        });
      } else {
        //store.dispatch(logout());
      }

      store.dispatch({ type: AUTH_LOADING, payload: false })
    } catch (error) {

    }
  };

  const [loaded] = Font.useFonts({
    'Lato-Bold': require('./src/assets/fonts/Lato-Bold.ttf'),
    'Lato-Regular': require('./src/assets/fonts/Lato-Regular.ttf'),
    'Lato-Light': require('./src/assets/fonts/Lato-Light.ttf'),
  });

  if (!loaded) {
    return null
  }


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
}

