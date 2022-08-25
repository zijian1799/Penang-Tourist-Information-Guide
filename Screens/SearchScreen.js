import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        {/* search bar, allow input, search icon */}
        {/* when click search icon or click enter, execute search query */}
        <ScrollView style={styles.content}>
          {/* foreach here */}
          {/* search response template */}
          {/* when user click on name, bring user to corresponding page/screen */}
        </ScrollView>
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
