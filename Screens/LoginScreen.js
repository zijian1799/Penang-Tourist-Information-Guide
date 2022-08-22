import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import {Alert, Button, StyleSheet, View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
let config = require('../Config');

export default class LoginScreen extends Component {  
  constructor(props){
    super(props);

    this.state = {
      username:'',      
      password:'',
      user:[],      
      isFetching: false,
    };
  }
  
  saveUser = async (user) => {
    try{
      var User = {
        username: user.name,
        password: user.password
      }
      await AsyncStorage.setItem('UserDetail', JSON.stringify(User));
    } catch (error){
      console.log(error)
    }
  }

  _login(){
    let url = config.settings.serverPath + '/api/login';
    this.setState({isFetching: true});
    
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
      .then(response => {
        if (!response.ok){
          Alert.alert('Error:', 'Wrong username and password combination');                   
        }
        this.setState({isFetching: false});
        return response.json();
      })
      .then(data => {   
        if (data != null){
          this.setState({user: data});

          this.props.navigation.navigate('content');
        }   
        this.setState({user: data}); 
      })
      .catch(error => {
        console.error("There was an error", error);
      })
  }

  render(){
    const pressHandler = () => {
      if (this.state.username === ''){
        Alert.alert('Please enter username');
      }else if (this.state.password === ''){
        Alert.alert('Please enter password.');
      }else{        
        this._login();
      }
    };

    return(
      <View>
        <Text>Login</Text>        
        <TextInput 
          style = {styles.input} 
          placeholder = {"Username:"} 
          onChangeText = {username => this.setState({username})}
        />
        <TextInput 
          style = {styles.input} 
          placeholder = {"Password:"}
          keyboardType = {'default'} 
          secureTextEntry 
          onChangeText = {password => this.setState({password})}
        />
        <Button
          title= "Log In"
          onPress={pressHandler} />
      </View>
        
    );
  }
}

const styles = StyleSheet.create({
  input:{
    width: 200,
    padding: 20,
    borderRadius: 30,
  }


})