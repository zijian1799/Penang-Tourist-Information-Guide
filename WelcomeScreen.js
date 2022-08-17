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
        <Text style={styles.title}>Welcome to Penang</Text>
        <Button
          style={styles.button}
          title="Get Started"
          onPress={() => this.props.navigation.navigate('content')}
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
    fontFamily: 'monospace',
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
