import React, {Component} from 'react';
import {View, Text, Button, ImageBackground, StyleSheet} from 'react-native';

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require('./Assets/welcomeWallpaper.png')}>
        <View>
          <Text style={styles.title}>Welcome to Penang</Text>
        </View>
        <Button
          style={styles.button}
          title="Get Started"
          onPress={() => this.props.navigation.navigate('auth')}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DFEFE3',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    color: 'white',
    fontSize: 50,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
  },
  button: {
    color: 'white',
    backgroundColor: 'lightgreen',
    borderRadius: 20,
  },
});
