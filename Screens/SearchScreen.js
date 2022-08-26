import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from 'react-native';


let config = require('../Config');

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword : '',
    };
  }
  _search() {
    let url = config.settings.serverPath + '/api/search/' + this.state.keyword ;
    this.setState({isFetching: true});
    fetch(url)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error:', response.status.toString());
          throw Error('Error ' + response.status);
        }
        this.setState({isFetching: false});
        return response.json();
      })

      .then(places => {
        console.log(places);
        this.setState({populars: places});
      })
      .catch(error => {
        console.error(error);
      });
  }

  _poc(){
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder={'Search'}
              value={this.state.keyword}
              onChangeText={keyword => {
                this.setState({keyword});
              }}
            />
           {/*  <Image style={styles.avatar} source={{uri: 'https://www.pngkey.com/png/detail/202-2024792_user-profile-icon-png-download-fa-user-circle.png'}}/> */}
          </View>
          <Button title={'Search'} onPress={this._search.bind(this)}></Button>
        </View>
        {/* when click search icon or click enter, execute search query */}
        <ScrollView style={styles.content}>
          {/* foreach here */}
          {/* search response template */}
          {/* when user click on name, bring user to corresponding page/screen */}
        </ScrollView>
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
  header: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  inputView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
  },
});
