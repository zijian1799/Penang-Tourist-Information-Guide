import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {FloatingAction} from 'react-native-floating-action';
import AsyncStorage from '@react-native-async-storage/async-storage';

let config = require('../Config');
const win = Dimensions.get('window').width;
const action = [
  {
    text: 'Add',
    icon: require('../Assets/icons/add_icon.png'),
    name: 'add',
    position: 1,
    color: '#cd5c5c',
  },
  // {
  //   text: 'Edit',
  //   icon: require('../Assets/icons/edit_icon.png'),
  //   name: 'edit',
  //   position: 2,
  //   color: '#cd5c5c',
  // },
];

export default class ReviewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.id,
      user_id: 0,
      place: [],
      reviews: [],
      review: [],
      isFetchingReviews: false,
      isFetchingPlaces: false,
      isFetchingReview_byuser: false,
    };
    this._loadPlaces = this._loadPlaces.bind(this);
    this._loadReviews = this._loadReviews.bind(this);
    this._loadReviewsByuser_id = this._loadReviewsByuser_id.bind(this);

    this._readUser = this._readUser.bind(this);
  }

  componentDidMount() {
    this._loadPlaces();
    this._loadReviews();
    this._readUser();
    // this._loadReviewsByuser_id();
  }

  _loadReviews() {
    let url = config.settings.serverPath + '/api/reviews/' + this.state.id;
    this.setState({isFetchingReviews: true});
    fetch(url)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error: ', response.status.toString());
          throw Error('Error ' + response.status);
        }
        this.setState({isFetchingReviews: false});
        return response.json();
      })

      .then(reviews => {
        console.log(reviews);
        this.setState({reviews: reviews});
        // this.setState({user_id: parseInt(reviews[0].user_id)});
        // console.log(reviews[0].user_id);
      })

      .catch(error => {
        console.error(error);
      });
  }
  _loadReviews() {
    let url = config.settings.serverPath + '/api/reviews/' + this.state.id;
    this.setState({isFetchingReviews: true});
    fetch(url)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error: ', response.status.toString());
          throw Error('Error ' + response.status);
        }
        this.setState({isFetchingReviews: false});
        return response.json();
      })

      .then(reviews => {
        console.log(reviews);
        this.setState({reviews: reviews});
        // this.setState({user_id: parseInt(reviews[0].user_id)});
        // console.log(reviews[0].user_id);
      })

      .catch(error => {
        console.error(error);
      });
  }
  _loadReviewsByuser_id() {
    this._readUser();
    let url =
      config.settings.serverPath + '/api/userreview/' + this.state.user_id;
    this.setState({isFetchingReview_byuser: true});
    fetch(url)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error: ', response.status.toString());
          throw Error('Error ' + response.status);
        }
        this.setState({isFetchingReview_byuser: false});
        return response.json();
      })

      .then(review => {
        console.log('re:: ' + review);
        this.setState({review: review});
        // this.setState({user_id: parseInt(reviews[0].user_id)});
        // console.log(reviews[0].user_id);
      })

      .catch(error => {
        console.error(error);
      });
  }
  _loadPlaces() {
    let url = config.settings.serverPath + '/api/places/' + this.state.id;
    this.setState({isFetchingPlaces: true});
    fetch(url)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error: ', response.status.toString());
          throw Error('Error ' + response.status);
        }
        this.setState({isFetchingPlaces: false});
        return response.json();
      })

      .then(place => {
        // console.log(place);
        this.setState({place: place});
      })

      .catch(error => {
        console.error(error);
      });
  }
  async _readUser() {
    try {
      let username = await AsyncStorage.getItem('Username');
      let email = await AsyncStorage.getItem('Email');
      let user_id = await AsyncStorage.getItem('user_id');
      console.log(user_id);

      if (user_id !== null) {
        this.setState({user_id: parseInt(user_id)});
        // this.setState({username: username});
        // this.setState({email: email});
        console.log(this.state.user_id);
        // console.log(this.state.username);
      }
    } catch (error) {
      console.log('Error loading user details.', error);
    }
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
                    color: 'white',
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
                    color: 'yellow',
                    fontWeight: 'bold',
                  }}>
                  Reviews
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            {/* <Text style={styles.aboutStyle}>
              Location: {this.state.place.location}
            </Text> */}
            <FlatList
              refreshing={this.state.isFetchingReviews}
              onRefresh={this._loadReviews}
              data={this.state.reviews}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      // height: 120,
                      marginHorizontal: 10,
                      borderTopWidth: 5,
                      borderTopColor: 'transparent',
                      flexDirection: 'row',
                      backgroundColor: '#65a7a7',
                      borderRadius: 20,
                    }}>
                    <View style={{flexDirection: 'column', padding: 10}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          padding: 10,
                          width: 350,
                        }}>
                        <Text style={styles.nameText}>{item.name}</Text>
                        <View style={styles.dateview}>
                          <Text
                            style={{
                              position: 'absolute',
                              right: 0,
                              color: 'white',
                            }}>
                            {item.date}
                          </Text>
                        </View>
                      </View>
                      <Text style={{paddingLeft: 10}}>
                        Stars Rating: {item.ratingStars}
                      </Text>
                      <Text style={styles.reviewText}>"{item.comment} "</Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <FloatingAction
          actions={action}
          color="#cd5c5c"
          onPressItem={name => {
            switch (name) {
              case 'add':
                this.props.navigation.navigate('Create', {
                  _refresh: this._loadReviews,
                  place_id: this.state.id,
                  place_name: this.state.place.name,
                });
                break;
              case 'edit':
                this.props.navigation.navigate('Edit', {
                  // _refresh: this._loadReviews,
                  place_id: this.state.id,
                  place_name: this.state.place.name,
                  user_id: this.state.user_id,
                });
                break;
            }
          }}></FloatingAction>
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
    // backgroundColor: 'green',
    // marginLeft: 0,
    // justifyContent: 'space-between',
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
    // marginTop: 5,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    textAlign: 'center',
    shadowColor: '#05445E',
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    shadowOpacity: 1,
    // opacity: 0.8,
  },
  innerText: {
    color: 'white',
    alignItems: 'center',
  },
  reviewText: {
    // flex: 1,
    padding: 10,
    fontSize: 18,
    // color: 'white',
  },
  nameText: {
    width: 150,
    color: 'white',
  },
  dateview: {
    flex: 1,
  },
});
