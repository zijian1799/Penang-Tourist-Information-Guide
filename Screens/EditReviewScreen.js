import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  View,
  Image,
  Switch,
  Button,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import {InputWithLabel, PickerWithLabel, AppButton} from '../UI';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';

let config = require('../Config');
Date.prototype.formatted = function () {
  let day = this.getDay();
  let date = this.getDate();
  let month = this.getMonth();
  let year = this.getFullYear();
  let daysText = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let monthsText = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${daysText[day]}, ${monthsText[month]} ${date}, ${year}`;
};

const action = [
  {
    text: 'Delete',
    icon: require('../Assets/icons/delete_icon.jpg'),
    name: 'delete',
    position: 1,
    color: '#cd5c5c',
  },
];

export default class CreateReviewScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      place_id: this.props.route.params.place_id,
      place_name: this.props.route.params.place_name,
      user_id: this.props.route.params.user_id,
      reviews_id: parseInt(this.props.route.params.user_review_id),
      date: '',
      ratingStars: 0,
      comment: '',
      date: new Date(Date.now()),
      review: [],
      isFetchingReview: false,
    };
    this._readUser = this._readUser.bind(this);
    this._loadReviewByID = this._loadReviewByID.bind(this);
    this._edit = this._edit.bind(this);
    this._delete = this._delete.bind(this);
  }

  componentDidMount() {
    this._readUser();
    this._loadReviewByID();
    this.props.navigation.setOptions({headerTitle: 'Edit Review'});
  }

  _loadReviewByID() {
    let url =
      config.settings.serverPath + '/api/user_reviews/' + this.state.reviews_id;
    this.setState({isFetchingReview: true});
    fetch(url)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error: ', response.status.toString());
          throw Error('Error ' + response.status);
        }
        this.setState({isFetchingReview: false});
        return response.json();
      })

      .then(review => {
        console.log(review);
        this.setState({ratingStars: review.ratingStars});
        this.setState({comment: review.comment});
        this.setState({review: review});
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

      if (user_id !== null) {
        this.setState({user_id: parseInt(user_id)});
        this.setState({username: username});
        this.setState({email: email});
      }
    } catch (error) {
      console.log('Error loading user details.', error);
    }
  }
  _edit() {
    let url =
      config.settings.serverPath + '/api/reviews/' + this.state.reviews_id;

    fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reviews_id: this.state.reviews_id,
        user_id: this.state.user_id,
        place_id: this.state.place_id,
        date: this.state.date.formatted(),
        ratingStars: this.state.ratingStars,
        comment: this.state.comment,
      }),
    })
      .then(response => {
        console.log(response);
        if (!response.ok) {
          Alert.alert('Error:', response.status.toString());
          throw Error('Error ' + response.status);
        }

        return response.json();
      })
      .then(respondJson => {
        if (respondJson.affected > 0) {
          Alert.alert('Review UPDATED.');
        } else {
          Alert.alert('Error in UPDATING');
        }
        this.props.route.params._refresh();
        this.props.navigation.goBack();
      })
      .catch(error => {
        console.log(error);
      });
  }

  _delete() {
    Alert.alert('Confirm to DELETE review for ', this.state.place_name + '?', [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
          let url =
            config.settings.serverPath +
            '/api/user_reviews/' +
            this.state.reviews_id;
          console.log(url);
          fetch(url, {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({reviews_id: this.state.reviews_id}),
          })
            .then(response => {
              if (!response.ok) {
                Alert.alert('Error:', response.status.toString());
                throw Error('Error ' + response.status);
              }
              return response.json();
            })
            .then(responseJson => {
              if (responseJson.affected == 0) {
                Alert.alert('Error in DELETING');
              }
            })
            .catch(error => {
              console.error(error);
            });
          this.props.route.params._refresh();
          this.props.navigation.goBack();
        },
      },
    ]);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{marginTop: '25%', justifyContent: 'center', padding: 10}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 30,
            }}>
            {this.state.place_name}
          </Text>

          <Text style={{fontWeight: 'bold', fontSize: 20}}>Rating stars: </Text>

          <View style={{alignItems: 'center'}}>
            <Slider
              style={{width: 300, margin: 20}}
              step={1}
              minimumValue={1}
              maximumValue={5}
              value={this.state.review.ratingStars}
              onValueChange={ratingStars => this.setState({ratingStars})}
            />
            <View style={{flexDirection: 'row'}}>
              <Text>{this.state.ratingStars} </Text>
              <Image
                source={require('../Assets/stars.png')}
                style={{width: 20, height: 20}}
              />
            </View>
          </View>

          <InputWithLabel
            textLabelStyle={styles.TextLabel}
            textInputStyle={styles.TextInput}
            label={'Comments'}
            placeholder={'Type comments here'}
            value={this.state.comment}
            onChangeText={comment => {
              this.setState({comment});
            }}
            orientation={'vertical'}
          />

          <AppButton title={'Save'} onPress={this._edit}></AppButton>
        </View>
        <FloatingAction
          actions={action}
          color="#cd5c5c"
          onPressItem={name => {
            switch (name) {
              case 'delete':
                this._delete();
                console.log('Delete clicked');
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
    padding: 20,
    // backgroundColor: '#fff',
  },
  TextLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 3,
    textAlignVertical: 'center',
  },

  TextInput: {
    fontSize: 24,
    color: 'black',
  },

  pickerItemStyle: {
    fontSize: 20,
    color: '#000099',
  },
  input: {
    fontSize: 20,
    height: 48,
    color: 'black',
    // borderBottomWidth: 2,
    // borderBottomColor: 'red',
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
  header: {
    backgroundColor: 'Navy',
  },
});
