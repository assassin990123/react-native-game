import React from 'react';
//import StartMenu from './components/startMenu/startMenu';
import RegistrationMenu from './components/registrationMenu/RegistrationMenu';
import { View } from 'react-native';

export default function App() {
  return (
    <View>
      <RegistrationMenu/>
      {/*<StartMenu/>*/}
    </View>
  );
}