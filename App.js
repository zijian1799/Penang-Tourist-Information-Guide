import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome';
import FavScreen from './Screens/FavScreen';
import ProfileScreen from './Screens/ProfileScreen';
import SearchScreen from './Screens/SearchScreen';
import HomeNavigator from './HomeNavigator';

const Tab = createBottomTabNavigator();
const StackNav = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tintColor: 'black',
          tabBarActiveBackgroundColor: 'lightgrey',
          tabBarActiveTintColor: 'black',
        }}>
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={styles.profileOptions}
        />

        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={styles.homeOptions}></Tab.Screen>
        {/* <Tab.Screen
          name="Navigation"
          component={NavScreen}
          options={styles.navOptions}
        /> */}
        <Tab.Screen
          name="Favourite"
          component={FavScreen}
          options={styles.favOptions}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={styles.searchOptions}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  profileOptions: {
    tabBarIcon: ({tintColor}) => <Icon name="user" size={25} color="black" />,
  },
  homeOptions: {
    tabBarIcon: ({tintColor}) => <Icon name="home" size={25} color="black" />,
  },
  favOptions: {
    tabBarIcon: ({tintColor}) => <Icon name="heart" size={25} color="black" />,
  },
  navOptions: {
    tabBarIcon: ({tintColor}) => <Icon name="gps" size={25} color="black" />,
  },
  searchOptions: {
    tabBarIcon: ({tintColor}) => <Icon name="search" size={25} color="black" />,
  },
});
