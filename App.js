import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import MainNavigator from './navigation/MealsNavigator';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers } from 'redux';
import mealsReducer from './store/reducers/meals';
import { Provider } from 'react-redux';

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer,
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontloaded, setfontloaded] = useState(false);
  if (!fontloaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setfontloaded(true)}
      />
    );
  }
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
