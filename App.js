import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screen/HomeScreen';
import ListScreen from './src/screen/ListScreen';
import ListWithScrollView from './src/screen/ListWithScrollView';
import FormScreen from './src/screen/FormScreen';

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>

      <Stack.Navigator initialRouteName = 'Home'>

        <Stack.Screen
          name = 'Home'
          component = {HomeScreen}
          options = {{ headerShown: false }}
        />

        <Stack.Screen
          name = 'ListWithScrollView'
          component = {ListWithScrollView}
          options = {{ headerShown: false }}
        />
        
        <Stack.Screen
          name = "ListWithFlatList"
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