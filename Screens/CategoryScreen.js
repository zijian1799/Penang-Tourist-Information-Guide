import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.route.params.category,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Category Screen</Text>
        <Text>{this.state.category}</Text>
        <Text>test</Text>
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
