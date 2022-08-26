import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Alert,
  TouchableNativeFeedback,
} from 'react-native';


let config = require('../Config');

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword : '',
      search : [],
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
        this.setState({search: places});
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
          </View>
          <View style={styles.buttonSearch}>
            <Button title={'Search'} onPress={this._search.bind(this)}></Button>
          </View>
        </View>
        <ScrollView>
          {this.searchList()}
          {/* when user click on name, bring user to corresponding page/screen */}
        </ScrollView>
      </View>
    );
  }

  searchList(){
    return this.state.search.map((data) => {
      return (
        <TouchableNativeFeedback
          onPress={() => {
            this.props.navigation.navigate('detailsScreen', {
              id: data.place_id,
            });
          }}>
          <View style={styles.searchResultContainer}>
            <Text style={styles.searchResult}>{data.name}</Text>
          </View>
        </TouchableNativeFeedback>
      )
    })
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
  buttonSearch: {
    marginTop: 20,
  },
  searchResultContainer: {
    width: '100%',
    height: 50,
    padding: 10,
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
  },
  searchResult: {
    fontSize: 20,
    textAlign: 'left',
  }
});
