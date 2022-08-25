import React, {Component} from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Button,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';

let config = require('../Config');
const win = Dimensions.get('window').width;
let SQLite = require('react-native-sqlite-storage');

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      populars: [],
      isFetching: false,
    };
    this._load = this._load.bind(this);
    this._loadAttraction = this._loadAttraction.bind(this);
  }

  _load() {
    let url = config.settings.serverPath + '/api/places';
    this.setState({isFetching: true});
    fetch(url)
      .then(response => {
        console.log(response);
        if (!response.ok) {
          Alert.alert('Error:', response.status.toString());
          throw Error('Error ' + response.status);
        }
        this.setState({isFetching: false});
        return response.json();
      })
      .then(places => {
        // console.log(places);
        this.setState({places: places});
      })
      .catch(error => {
        console.log(error);
      });
  }

  _loadAttraction() {
    let url = config.settings.serverPath + '/api/places/attraction';
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

  componentDidMount() {
    this._load();
    this._loadAttraction();
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <View style={{flex: 5}}>
              <Image
                source={require('../Assets/penangWallpaper.png')}
                style={{
                  width: Dimensions.get('window').width,
                  // height: Dimensions.get('window').height / 3,
                  height: '100%',
                }}></Image>
            </View>
            {/* Explore Part */}
            <View style={styles.headerview}>
              <Text style={styles.header}>Explore</Text>
            </View>
            <View style={[styles.innercontainer, styles.commoncontainer]}>
              <TouchableOpacity
                style={[styles.button, styles.basechild]}
                onPress={() => {
                  this.props.navigation.navigate('categoryScreen', {
                    category: 'food',
                  });
                }}>
                <Image
                  source={require('../Assets/foods.png')}
                  style={{
                    opacity: 0.9,
                    width: 160,
                    height: 140,
                    borderRadius: 20,
                  }}
                />
                <View style={styles.innerText}>
                  <Text
                    style={{
                      bottom: 50,
                      fontSize: 25,
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                    Foods
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={[styles.innercontainer, styles.colcontainer]}>
                <TouchableOpacity
                  style={(styles.button, styles.colbasechild)}
                  onPress={() => {
                    this.props.navigation.navigate('categoryScreen', {
                      category: 'hotel',
                    });
                  }}>
                  <Image
                    source={require('../Assets/hotels.png')}
                    style={styles.colCategoryImg}
                  />
                  <View style={styles.innerText}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'white',
                        fontWeight: 'bold',
                      }}>
                      Hotels
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={(styles.button, styles.colbasechild)}
                  onPress={() => {
                    this.props.navigation.navigate('categoryScreen', {
                      category: 'attraction',
                    });
                  }}>
                  <Image
                    source={require('../Assets/attractions.png')}
                    style={styles.colCategoryImg}
                  />
                  <View style={styles.innerText}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'white',
                        fontWeight: 'bold',
                      }}>
                      Attractions
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Popular Part */}
            <View style={styles.headerview}>
              <Text style={styles.header}>Popular</Text>
            </View>
            <View
              style={[
                styles.innercontainer,
                styles.commoncontainer,
                styles.flatlistview,
              ]}>
              <FlatList
                horizontal={true}
                scrollEnabled={true}
                data={this.state.populars}
                showsVerticalScrollIndicator={true}
                // refreshing={fetching}
                renderItem={({item}) => {
                  return (
                    <View style={styles.carousel}>
                      <TouchableOpacity
                        style={styles.carouselButton}
                        onPress={() => {
                          this.props.navigation.navigate('detailsScreen', {
                            id: item.place_id,
                          });
                        }}>
                        <ImageBackground
                          source={{uri: item.image}}
                          style={{width: 140, height: 140}}
                          imageStyle={{borderRadius: 10}}>
                          <Text
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                              fontSize: 16,
                              paddingHorizontal: 10,
                              position: 'absolute',
                              bottom: 10,
                            }}>
                            <Text>{item.name}</Text>
                          </Text>
                        </ImageBackground>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    // backgroundColor: '#e1e1e1',
  },
  button: {
    backgroundColor: '#blue',
    borderRadius: 20,
    marginTop: 15,
    padding: 10,
    shadowColor: '#303838',
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
  carouselButton: {
    borderRadius: 20,
    // marginTop: 0,
    // padding: 10,
    shadowColor: '#303838',
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
  commoncontainer: {
    flexDirection: 'row',
  },
  colcontainer: {
    flexDirection: 'column',
    marginTop: 15,
  },
  innercontainer: {
    flex: 3.8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    // marginTop: -25,
  },
  flatlistview: {
    marginTop: -15,
  },
  innerText: {
    bottom: 45,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  basechild: {
    textAlign: 'justify',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  colbasechild: {
    textAlign: 'justify',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  header: {
    flex: 1,
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
    marginLeft: 15,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    fontFamily: 'roboto',
  },
  carousel: {
    flexDirection: 'row',
    padding: 5,
  },
  carouselimage: {
    height: 150,
    width: 150,
  },
  headerview: {
    flex: 1.3,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#DDF3F9',
  },
  colCategoryImg: {
    opacity: 0.9,
    padding: 20,
    width: 160,
    height: 60,
    borderRadius: 10,
  },
});
