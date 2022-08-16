import React, {Component} from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  Linking,
  ImageBackground,
} from 'react-native';
import {ceil, color} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

const win = Dimensions.get('window').width;
let SQLite = require('react-native-sqlite-storage');

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
    };
    this._query = this._query.bind(this);
    // this._databasePrepare = this._databasePrepare.bind(this);
    this.db = SQLite.openDatabase(
      {name: 'touristguidedb3', createFromLocation: '~touristguidedb3.sqlite'},
      this.openCallback,
      this.errorCallback,
    );
  }
  componentDidMount() {
    // this._databasePrepare();
    this._query();
  }
  _databasePrepare() {
    this.db.transaction(tx => {
      tx.executeSql(
        // 'DROP TABLE IF EXISTS places',
        'CREATE TABLE IF NOT EXISTS places(id INTEGER PRIMARY KEY AUTOINCREMENT, name text NOT NULL, description text NOT NULL, category text NOT NULL, image text NOT NULL, location text NOT NULL, is_favourite INTEGER, operating_hours VARCHAR(30), priceRange INTEGER, website text, contact text)',
        [],
        (sqlTxn, res) => {
          console.log('places table ready');
        },
        error => {
          console.log('error on creating table ' + error.message);
        },
      );
      this.db.transaction(tx =>
        tx.executeSql(
          // 'DELETE FROM places',

          'SELECT * FROM places ORDER BY name',
          [],
          (tx, results) => {
            console.log('table length: ' + results.rows.length);

            if (results.rows.length == 0) {
              tx.executeSql(
                'INSERT INTO places(name,description,category,image,location,is_favourite,operating_hours,priceRange,website,contact) VALUES("The Habitat Penang","Educational & fun attraction showing off the areas pristine rainforest while teaching about it ","attraction","https://firebasestorage.googleapis.com/v0/b/wad-assignment-cf7c0.appspot.com/o/thumbnails%2FhabitatPenangHill.png?alt=media&token=d93b3cd8-a257-4f53-ad46-9c03e1129ec3","Jalan Stesen, Bukit Bendera Air Itam, 11500 George Town, Pulau Pinang.",0,"Allday 9am – 7pm",2,"https://thehabitat.my/","019-6457741")',
                [], //insert dummy data so that the database is non-empty, to ease verification
                (tx, results) => {
                  if (results.rowsAffected > 0) {
                    console.log('dummy data inserted successfully');
                    console.log(this.state.places);
                    this._query();
                  } else {
                    console.log('error in inserting data');
                  }
                },
              );
            } else {
              console.log('table non-empty, no insertion needed');
            }
          },
        ),
      );
    });
  }

  _query() {
    this.db.transaction(tx =>
      tx.executeSql(
        'SELECT * FROM places ORDER BY name',
        [],
        (tx, results) => this.setState({places: results.rows.raw()}),
        // console.log('Table length: ' + results.rows.length),
      ),
    );
  }

  openCallback() {
    console.log('Database open success');
  }
  errorCallback(err) {
    console.log('Error in opening the database: ' + err.message);
  }

  render() {
    // console.log(this.state.places);
    return (
      <>
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <View style={{flex: 5}}>
              <Image
                source={require('../Assets/home_wallpaper.jpg')}
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
                  alert('you clicked foods');
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
                    alert('you clicked hotels');
                  }}>
                  <Image
                    source={require('../Assets/hotels.png')}
                    style={{
                      opacity: 0.9,
                      padding: 20,
                      width: 160,
                      height: 60,
                      borderRadius: 10,
                    }}
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
                    alert('you clicked attractions');
                  }}>
                  <Image
                    source={require('../Assets/attractions.png')}
                    style={{
                      padding: 20,
                      width: 160,
                      height: 60,
                      borderRadius: 10,
                      opacity: 0.9,
                    }}
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
            <View style={[styles.innercontainer, styles.commoncontainer]}>
              <FlatList
                horizontal={true}
                scrollEnabled={true}
                data={this.state.places}
                showsVerticalScrollIndicator={true}
                // refreshing={fetching}
                renderItem={({item}) => {
                  return (
                    <View style={styles.carousel}>
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
                          {/* <Text
                            style={{color: 'blue'}}
                            onPress={() => {
                              Linking.openURL(item.website);
                            }}>
                            {item.website}
                          </Text> */}
                        </Text>
                      </ImageBackground>
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
  },
  carousel: {
    flexDirection: 'row',
    padding: 5,
    paddingTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselcomponent: {
    padding: 10,
    margin: 10,
  },
  carouselimage: {
    height: 150,
    width: 150,
  },
  headerview: {
    flex: 1.3,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});
