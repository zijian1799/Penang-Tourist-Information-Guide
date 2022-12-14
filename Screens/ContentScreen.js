import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome';
// import FavScreen from './FavScreen';
import ProfileScreen from './ProfileScreen';
import SearchScreen from './SearchScreen';

import HomeNavigator from './HomeNavigator';
import DetailNavigator from './DetailNavigator';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default class ContentScreen extends Component {
  render() {
    return (
      <>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tintColor: 'black',
            tabBarActiveBackgroundColor: 'lightgrey',
            tabBarActiveTintColor: 'black',
          }}>
          <Tab.Screen
            name="Home"
            component={HomeNavigator}
            options={styles.homeOptions}></Tab.Screen>
          <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={styles.searchOptions}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={styles.profileOptions}
          />
          <Tab.Screen
            name="detailsNavigator"
            component={DetailNavigator}
            options={{
              tabBarButton: props => null, //like this
            }}
          />
        </Tab.Navigator>
      </>
    );
  }
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
  detailsOptions: {
    // tabBarIcon: ({tintColor}) => (
    //   <Icon name="location" size={25} color="black" />
    // ),
    display: 'none',
  },
  searchOptions: {
    tabBarIcon: ({tintColor}) => <Icon name="search" size={25} color="black" />,
  },
});
