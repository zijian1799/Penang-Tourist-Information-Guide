import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CategoryScreen from './Screens/CategoryScreen';
import DetailNavigator from './Screens/DetailNavigator';

import HomeScreen from './Screens/HomeScreen';

const Stack = createStackNavigator();

export default class HomeNavigator extends Component {
  render() {
    return (
      <Stack.Navigator
        initialRouteName="HomeNavigator"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="HomeNavigator"
          component={HomeScreen}></Stack.Screen>
        <Stack.Screen
          name="categoryScreen"
          component={CategoryScreen}></Stack.Screen>
        <Stack.Screen
          name="detailsScreen"
          component={DetailNavigator}></Stack.Screen>
      </Stack.Navigator>
    );
  }
}
