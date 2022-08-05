import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
    };
  }

  render() {
    return (
      <View style={styles.maincontainer}>
        <View style={[styles.firstcontainer, styles.commoncontainer]}>
          <Text style={styles.basechild}> Child One </Text>
          <Text style={styles.basechild}> Child Two </Text>
          <Text style={styles.basechild}> Child Three </Text>
        </View>

        <View style={[styles.secondcontainer, styles.commoncontainer]}>
          <Text style={styles.basechild}> Child One </Text>
          <Text style={styles.basechild}> Child Two </Text>
          <Text style={styles.basechild}> Child Three </Text>
        </View>

        <View style={[styles.thirdcontainer, styles.commoncontainer]}>
          <Text style={styles.basechild}> Child One </Text>
          <Text style={styles.basechild}> Child Two </Text>
          <Text style={[styles.basechild, {alignSelf: 'stretch'}]}>
            Child Three
          </Text>
          <Text style={styles.basechild}> Child Four </Text>
        </View>

        <View style={[styles.fourthcontainer, styles.commoncontainer]}>
          <Text style={[{flex: 1, flexWrap: 'wrap'}, styles.basechild]}>
            some stuff
          </Text>
          <Text style={[{flex: 1, flexWrap: 'wrap'}, styles.basechild]}>
            Theres a lot of text here to be read and understood and we really
            need to spend time reading
          </Text>
          <Text style={[{flex: 1, flexWrap: 'wrap'}, styles.basechild]}>
            slightly less sentences than previously
          </Text>
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
  category: {
    flexDirection: 'row',
    padding: 20,
    margin: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
  },
  button: {
    backgroundColor: '#859a9b',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
  maincontainer: {
    flex: 1,
    flexDirection: 'column',
    borderColor: 'red',
    borderWidth: 5,
    margin: 5,
  },

  commoncontainer: {
    flexDirection: 'row',
    backgroundColor: 'lightgreen',
    borderColor: 'blue',
    borderWidth: 5,
    margin: 5,
    padding: 10,
  },

  firstcontainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    // default alignItems: 'stretch'
  },

  secondcontainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },

  thirdcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fourthcontainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },

  basechild: {
    color: 'black',
    borderColor: 'grey',
    borderWidth: 2,
    textAlign: 'justify',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    margin: 5,
    padding: 5,
  },
});
