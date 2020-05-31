import React from 'react';
import StartMenu from './components/startMenu/startMenu';
import RegistrationMenu from './components/registrationMenu/RegistrationMenu';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View>
     {/* <RegistrationMenu/>
      <StartMenu/>*/}

      <NavigationContainer>
      <Stack.Navigator initialRouteName="StartMenu">
        <Stack.Screen name="StartMenu" component={StartMenu} />
        <Stack.Screen name="RegistrationMenu" component={RegistrationMenu} />
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
}