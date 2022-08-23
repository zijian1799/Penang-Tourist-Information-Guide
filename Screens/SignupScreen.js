import React, {Component} from 'react';
import {
  View, 
  Text, 
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
let config = require('../Config');


export default class SignupScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      retypePassword: '',      
    }
  }
  async _saveUser(){
    try {
      var User = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }
      await AsyncStorage.setItem('UserDetail', JSON.stringify(User));
    }catch (error){
      console.log(error)
    }
  }
  _register(){
    let url = config.settings.serverPath + '/api/register';    
    
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      })
    })
      .then(response => {
        if (!response.ok){
          Alert.alert('Error:', response.status.toString());
          throw Error('Error ' + response.status)                   
        }        
        return response.json();
      })
      .then(data => {   
        if (data.affected > 0){
          Alert.alert('Successfully registered.')
          this._saveUser();
          this.props.navigation.navigate('content');        
        }   
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    const pressHandler = () => {
      if (this.state.username === ''){
        Alert.alert('Please enter your username');
      }else if (this.state.password === ''){
        Alert.alert('Please enter your password.');
      }else if (this.state.email === ''){
        Alert.alert('Please enter your email.')
      }else if (this.state.retypePassword === ''){
        Alert.alert('The retype password field is required.')
      }else if (this.state.password != this.state.retypePassword){        
        Alert.alert('Password mismatch.')
      }else{
        this._register();
      }
    };

    return (
      <View style = {styles.container}>
        <Text style = {styles.title}>Sign Up</Text>
        <View style = {styles.inputView}>
          <TextInput 
            style = {styles.inputText} 
            placeholder = "Username" 
            underlineColorAndroid = {'transparent'}
            onChangeText = {username => this.setState({username})}
          />
        </View>
        <View style = {styles.inputView}>
          <TextInput 
            style = {styles.inputText} 
            placeholder = "Email" 
            underlineColorAndroid = {'transparent'}
            onChangeText = {email => this.setState({email})}
          />
        </View>
        <View style = {styles.inputView}>
          <TextInput 
            style = {styles.inputText} 
            placeholder = "Password" 
            secureTextEntry = {true} 
            underlineColorAndroid={'transparent'}
            onChangeText = {password => this.setState({password})}
          />
        </View>
        <View style = {styles.inputView}>
          <TextInput 
            style = {styles.inputText} 
            placeholder = "Retype Password" 
            secureTextEntry = {true} 
            underlineColorAndroid={'transparent'}
            onChangeText = {retypePassword => this.setState({retypePassword})}
          />
        </View>
        <Button style={styles.button} title = "Sign Up" onPress={pressHandler} />
        <TouchableOpacity onPress = {() => this.props.navigation.navigate('login')}>
          <Text style={styles.login}>Already have an ID? Let's sign in.</Text>            
        </TouchableOpacity>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputView:{
    width: "80%",
    backgroundColor: 'white',
    borderRadius: 25,
    height: 50,
    marginBottom: 30,
    justifyContent: 'center',
    padding:20,    
  },
  inputText:{
    height:50,
  },
  login:{
    color: '#3399FF',
    paddingTop: 20,
    fontSize: 20,
  }
})
