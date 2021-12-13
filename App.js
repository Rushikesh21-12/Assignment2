import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListScreen from './src/screen/ListScreen';
import FormScreen from './src/screen/FormScreen';

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>

      <Stack.Navigator initialRouteName = 'ListScreen'>

          <Stack.Screen
            name = "List"
            component = {ListScreen}
            options = {{ headerShown: false }}
          />

          <Stack.Screen
            name = 'Form'
            component = {FormScreen}
            options = {{ headerShown: false}}
          />

      </Stack.Navigator>

    </NavigationContainer>
  )
}