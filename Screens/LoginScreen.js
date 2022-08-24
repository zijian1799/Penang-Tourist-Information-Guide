import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-gesture-handler';
import {
  Alert,
  Button,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
let config = require('../Config');

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      user_id: 12,
      user: [],
    };
  }

  componentDidMount() {
    this._validateUser();
  }

  async _validateUser() {
    try {
      AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          navigation.navigate('content');
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async _saveUser(user) {
    try {
      let username = user.name;
      let email = user.email;
      let user_id = user.user_id;

      await AsyncStorage.setItem('Username', username);
      await AsyncStorage.setItem('Email', email);
      await AsyncStorage.setItem('user_id', user_id.toString());
      let test = await AsyncStorage.getItem('user_id');
      // let test = await AsyncStorage.getItem('user_id');

      // console.log(user_id);
      console.log(test);
    } catch (error) {
      console.log(error);
    }
  }

  _login() {
    let url = config.settings.serverPath + '/api/login';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error:', 'Wrong username and password combination');
        }
        return response.json();
      })
      .then(data => {
        if (data != null) {
          this.setState({user: data});
          this._saveUser(this.state.user);
          // console.log(this.state.user);

          this.props.navigation.navigate('content');
        }
      })
      .catch(error => {
        console.error('There was an error', error);
      });
  }

  render() {
    const pressHandler = () => {
      if (this.state.username === '') {
        Alert.alert('Please enter username');
      } else if (this.state.password === '') {
        Alert.alert('Please enter password.');
      } else {
        this._login();
      }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder={'Username:'}
            onChangeText={username => this.setState({username})}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder={'Password:'}
            secureTextEntry
            onChangeText={password => this.setState({password})}
          />
        </View>
        <Button title="Log In" onPress={pressHandler} />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('signup')}>
          <Text style={styles.signup}>Do not have an ID? Let's sign up.</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 25,
    height: 50,
    marginBottom: 30,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
  },
  signup: {
    color: '#3399FF',
    paddingTop: 20,
    fontSize: 20,
  },
});
