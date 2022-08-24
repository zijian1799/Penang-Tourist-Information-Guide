import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import ReviewScreen from './ReviewScreen';
import CreateScreen from './CreateReviewScreen';
import ViewScreen from './ViewReviewScreen';
import EditScreen from './EditReviewScreen';

import {LogBox} from 'react-native';
// LogBox.ignoreWarnings([
//   'Non-serializable values were found in the navigation state',
// ]);

const stack = createStackNavigator();
export default class ReviewNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.id,
    };
  }

  render() {
    return (
      <stack.Navigator
        initialRouteName="Review"
        screenOptions={{
          headerShown: false,
        }}>
        <stack.Screen
          name="Review"
          component={ReviewScreen}
          initialParams={{id: this.state.id}}
          options={styles.headerIndexStyle}></stack.Screen>
        <stack.Screen
          name="Create"
          component={CreateScreen}
          options={styles.headerIndexStyle}></stack.Screen>
        <stack.Screen
          name="View"
          component={ViewScreen}
          options={styles.headerIndexStyle}></stack.Screen>
        <stack.Screen
          name="Edit"
          component={EditScreen}
          options={styles.headerIndexStyle}></stack.Screen>
      </stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  //   headerIndexStyle: {
  //     title: 'Lecture  05: Cloud Conectivity',
  //     headerStyle: {
  //       backgroundColor: '#a80000',
  //     },
  //     headerTitleAlign: 'center',
  //     headerTintColor: '#fff',
  //     headerTitleStyle: {
  //       fontWeight: 'bold',
  //     },
  //   },
});
