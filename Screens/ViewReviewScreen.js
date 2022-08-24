import React, {Component} from 'react';
import {Alert, Image, StyleSheet, ScrollView, View} from 'react-native';
import {InputWithLabel} from '../UI';
import {FloatingAction} from 'react-native-floating-action';

let config = require('../Config');
const actions = [
  {
    text: 'Edit',
    color: '#cd5c5c',
    icon: require('../Assets/icons/edit_icon.png'),
    name: 'edit',
    position: 2,
  },
  {
    text: 'Delete',
    color: '#cd5c5c',
    icon: require('../Assets/icons/delete_icon.jpg'),
    name: 'delete',
    position: 1,
  },
];
export default class ViewReviewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.id,
      review: [],
    };
    this._loadByID = this._loadByID.bind(this);
  }

  componentDidMount() {
    this._loadByID();
  }

  componentDidUpdate() {
    this.props.navigation.setOptions({headerTitle: this.state.member.name});
  }

  _loadByID() {
    let url = config.settings.serverPath + '/api/reviews/' + this.state.id;
    console.log(url);
    fetch(url)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error:', response.status.toString());
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(review => {
        this.setState({review: review});
      })
      .catch(error => {
        console.error(error);
      });
  }

  _delete() {
    Alert.alert('Confirm to DELETE', this.state.review.name, [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
          let url =
            config.settings.serverPath + '/api/members/' + this.state.id;
          console.log(url);
          fetch(url, {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: this.state.id}),
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
    let review = this.state.review;
    console.log(review);
    if (review) {
      return (
        <ScrollView style={{flex: 1, margin: 10}}>
          <InputWithLabel
            textInputStyle={styles.input}
            textLabelStyle={styles.label}
            editable={false}
            label="Name:">
            {member.name ? member.name : 'No information'}
          </InputWithLabel>
          <InputWithLabel
            textInputStyle={styles.input}
            textLabelStyle={styles.label}
            editable={false}
            label="Email:">
            {member.email ? member.email : 'No information'}
          </InputWithLabel>

          <FloatingAction
            actions={actions}
            color="#cd5c5c"
            onPressItem={name => {
              switch (name) {
                case 'edit':
                  this.props.navigation.navigate('Edit', {
                    id: member.id,
                    _refresh: this._loadByID,
                    homeRefresh: this.props.route.params._refresh,
                  });
                  break;
                case 'delete':
                  this._delete();
                  break;
              }
            }}></FloatingAction>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    color: 'darkblue',
    fontSize: 15,
  },

  input: {
    color: 'black',
  },
});
