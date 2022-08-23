import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

let config = require('../Config');

export default class ReviewScreen extends Component {
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
        <Image source={{uri: this.state.place.image}} style={styles.imageStyle} />
        <Text style={styles.nameStyle}>{this.state.place.name}</Text>
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutStyle}>Location: {this.state.place.location}</Text>
          <Text style={styles.aboutStyle}>Operating Hours: {this.state.place.operatinghours}</Text>
          <Text style={styles.aboutStyle}>Price Range: {this.state.place.priceRange}</Text>
          <Text style={styles.aboutStyle}>Website: {this.state.place.website}</Text>
          <Text style={styles.aboutStyle}>Contact: {this.state.place.contact}</Text>
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

  imageStyle: {
    flex: 0.7
  },

  nameStyle: {
    position: 'absolute',
    top: 20,
    fontSize: 25,
    fontFamily: 'monospace',
    color: 'white'
  },

  aboutStyle: {
    marginTop: 10,
    fontSize: 20,
    color: 'black',
    fontFamily: 'monospace'
  }
});
