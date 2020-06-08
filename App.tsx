import React from 'react';

//import StartMenu from './components/startMenu/startMenu';
//import RegistrationMenu from './components/registrationMenu/RegistrationMenu';
//import CharacterMenu from './components/characterMenu/chracterMenu';
//import CreationCharacterMenu from './components/creationCharacterMenu/creationCharacterMenu'
import Constructer from './components/constructer/constructer'


//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';

import { View } from 'react-native';

//const Stack = createStackNavigator();

export default function App() {
  return (
    <View>
     {/* <RegistrationMenu/>
      <StartMenu/>
      <CharacterMenu/>
      <CreationCharacterMenu/>*/}

      <Constructer/>

     {/* <NavigationContainer>
      <Stack.Navigator initialRouteName="StartMenu">
        <Stack.Screen name="StartMenu" component={StartMenu} />
        <Stack.Screen name="RegistrationMenu" component={RegistrationMenu} />
      </Stack.Navigator>
    </NavigationContainer>*/}
    </View>
  );
}