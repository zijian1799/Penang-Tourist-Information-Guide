import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Alert, Button} from 'react-native';

let config = require('../Config');

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.id,
      place: [],
    };
    this._loadPlaces = this._loadPlaces.bind(this);
  }

  componentDidMount() {
    this._loadPlaces();
  }

  _loadPlaces() {
    let url = config.settings.serverPath + '/api/places/' + this.state.id;
    this.setState({isFetching: true});
    fetch(url)
      .then(response => {
        if(!response.ok) {
          Alert.alert('Error: ', response.status.toString());
          throw Error('Error ' + response.status);
        }
        this.setState({isFetching: false});
        return response.json();
      })

      .then(place => {
        console.log(place);
        this.setState({place: place});
      })

      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={{uri: this.state.place.image}} style = {styles.imageStyle} />
        <Text style={styles.nameStyle}>{this.state.place.name}</Text>
        <View style={styles.descriptionContainer}>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} title="About" onPress={() => {this.props.navigation.navigate('About', {id: this.state.id});}} />
            <Button style={styles.button} title="Reviews" onPress={() => {this.props.navigation.navigate('Reviews', {id: this.state.id});}} />
          </View>
          <Text style={styles.descriptionStyle}>{this.state.place.description}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'lightblue',
  },

  buttonContainer: {
    justifyContent: 'space-between',
  },

  descriptionStyle: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Roboto'
  },

  button: {
    width: 100
  },

  imageStyle: {
    flex: 0.8,
  },

  nameStyle: {
    position: 'absolute',
    top: 20,
    fontSize: 25,
    fontFamily: 'monospace',
    color: 'white',
  }
});
