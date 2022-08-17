import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './Screens/HomeScreen';
import NavScreen from './Screens/NavScreen';
import FavScreen from './Screens/FavScreen';
import ProfileScreen from './Screens/ProfileScreen';
import SearchScreen from './Screens/SearchScreen';

// function HomeScreen() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>HomeScreen</Text>
//     </View>
//   );
// }

// function NavScreen() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>NavScreen</Text>
//     </View>
//   );
// }
// function ProfileScreen() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>ProfileScreen</Text>
//     </View>
//   );
// }
// function SearchScreen() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>SearchScreen</Text>
//     </View>
//   );
// }
// function FavScreen() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>FavScreen</Text>
//     </View>
//   );
// }
const Tab = createBottomTabNavigator();

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
          component={HomeScreen}
          options={styles.homeOptions}
        />
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
