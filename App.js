import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from './Screens/WelcomeScreen';
import ContentScreen from './Screens/ContentScreen';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';

const Stack = createStackNavigator();

const AuthScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="welcome"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="welcome" component={WelcomeScreen}></Stack.Screen>
        <Stack.Screen name="auth" component={AuthScreen}></Stack.Screen>
        <Stack.Screen name="content" component={ContentScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
