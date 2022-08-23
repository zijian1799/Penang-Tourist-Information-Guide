import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'

import DetailsScreen from './DetailsScreen';
import AboutScreen from './AboutScreen';
import ReviewScreen from './ReviewScreen';


const Stack = createStackNavigator();

export default class DetailNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: this.props.route.params.id,
    };
  }  

  render() {
    return (
      <Stack.Navigator
        initialRouteName="Description"
        options={styles.stackNavigatorStyle}
        >

        <Stack.Screen
          name="Description"
          component={DetailsScreen}
          initialParams={{ id: this.state.id }}
          options={styles.descriptionStyle}
        />

        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={styles.aboutStyle}
        />
 
        <Stack.Screen
          name="Reviews"
          component={ReviewScreen}
          options={styles.reviewStyle}
        />
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  stackNavigatorStyle: {
    marginBottom: 400,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 50,
    backgroundColor: 'lightblue',
  },

  descriptionStyle: {
    borderRadius: 20,
    tabBarIcon: ({tintColor}) => <Ionicons name="today" size={25} color="black" />,
  },

  aboutStyle: {
    borderRadius: 20,
    tabBarIcon: ({tintColor}) => <Ionicons name="information-circle" size={25} color="black" />,
  },

  reviewStyle: {
    borderRadius: 20,
    tabBarIcon: ({tintColor}) => <Ionicons name="star" size={25} color="black" />,
  },
});
