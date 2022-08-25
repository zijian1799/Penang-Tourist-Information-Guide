import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

let config = require('../Config');
const win = Dimensions.get('window').width;

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
        if (!response.ok) {
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
        <View style={{flex: 0.4}}>
          <Image
            source={{uri: this.state.place.image}}
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height / 3,
              // height: '100%',
            }}></Image>
          <Text style={styles.nameStyle}>{this.state.place.name}</Text>
        </View>

        <View style={{flex: 0.6}}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonNav}
              onPress={() => {
                this.props.navigation.navigate('Description', {
                  id: this.state.id,
                });
              }}>
              <View style={styles.innerText}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  Description
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonNav}
              onPress={() => {
                this.props.navigation.navigate('About', {id: this.state.id});
              }}>
              <View style={styles.innerText}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'yellow',
                    fontWeight: 'bold',
                  }}>
                  About
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonNav}
              onPress={() => {
                this.props.navigation.navigate('Reviews', {
                  id: this.state.id,
                });
              }}>
              <View style={styles.innerText}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  Reviews
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.aboutStyle}>
              Location: {this.state.place.location}
            </Text>
            <Text style={styles.aboutStyle}>
              Operating Hours: {this.state.place.operatinghours}
            </Text>
            <Text style={styles.aboutStyle}>
              Price Range: {this.state.place.priceRange}
            </Text>
            <Text style={styles.aboutStyle}>
              Website: {this.state.place.website}
            </Text>
            <Text style={styles.aboutStyle}>
              Contact: {this.state.place.contact}
            </Text>
          </View>
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
    flex: 0.7,
  },

  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: -10,
  },
  aboutStyle: {
    color: 'black',
    fontSize: 20,
    marginHorizontal: 20,
    marginVertical: 5,
    fontFamily: 'Roboto',
  },

  button: {
    width: 100,
  },

  imageStyle: {
    flex: 0.8,
  },

  nameStyle: {
    position: 'absolute',
    top: 20,
    fontSize: 25,
    fontFamily: 'roboto',
    marginLeft: '5%',
    fontWeight: 'bold',
    color: 'white',
  },
  buttonNav: {
    width: '30%',
    backgroundColor: '#05445E',
    borderRadius: 10,
    marginTop: 5,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    textAlign: 'center',
    shadowColor: '#303838',
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    shadowOpacity: 0.8,
  },
  innerText: {
    color: 'white',
    alignItems: 'center',
  },
});
