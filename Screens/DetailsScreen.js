import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.id,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Details Screen</Text>
        <Text>{this.state.id}</Text>
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
});
