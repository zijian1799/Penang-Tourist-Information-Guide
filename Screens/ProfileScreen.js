import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ProfileScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      username: 'abc',
      email:'abc',
    }
  }
  componentDidMount(){
    this._readUser();
  }

  async _readUser(){
    try {
      let username = await AsyncStorage.getItem('Username'); 
      let email = await AsyncStorage.getItem('Email');
      
      if (username !== null){                     
        this.setState({username: username});
        console.log(this.state.username)
        this.setState({email: email})    
        console.log(this.state.email)
      }
    }catch (error){
      console.log('Error loading user details.', error)
    }
  }
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://www.pngkey.com/png/detail/202-2024792_user-profile-icon-png-download-fa-user-circle.png'}}/>
          <View style={styles.body}>
            <Text style={styles.name}>{this.state.username}</Text>
            <Text style={styles.email}>Email: {this.state.email}</Text>            
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  body:{
    marginTop:90,
    alignSelf: 'center',
  },
  name:{
    fontSize:40,
    color: "black",
    fontWeight: "600",
    fontFamily: "",
    textAlign: 'center',    
  },
  email:{
    fontSize:20,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});