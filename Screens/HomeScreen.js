import React, {Component} from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const win = Dimensions.get('window').width;

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
    };
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <View style={{flex: 5}}>
              <Image
                source={require('../Assets/home_wallpaper.jpg')}
                style={{
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height / 4,
                }}></Image>
              {/* <View style={{position: 'absolute', top: 50, left: 150}}>
                <Text
                  style={{color: 'white', fontSize: 35, fontWeight: 'bold'}}>
                  Penang
                </Text>
              </View> */}
            </View>
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
                  source={require('../Assets/foods.jpg')}
                  style={{
                    // marginTop: 20,
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
                    source={require('../Assets/hotels.jpg')}
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
                    source={require('../Assets/attractions.jpg')}
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
            <View style={styles.headerview}>
              <Text style={styles.header}>Popular</Text>
            </View>
            <View style={[styles.innercontainer, styles.commoncontainer]}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    alert('you clicked popular 1');
                  }}>
                  <Image
                    source={require('../Assets/attractions.jpg')}
                    style={{
                      padding: 20,
                      width: 120,
                      height: 120,
                      borderRadius: 10,
                      opacity: 0.9,
                    }}
                  />
                  <View
                    style={
                      (styles.innerText, {bottom: 30, alignItems: 'center'})
                    }>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'white',
                        fontWeight: 'bold',
                      }}>
                      Popular 1
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    alert('you clicked popular 1');
                  }}>
                  <Image
                    source={require('../Assets/attractions.jpg')}
                    style={{
                      padding: 20,
                      width: 120,
                      height: 120,
                      borderRadius: 10,
                      opacity: 0.9,
                    }}
                  />
                  <View
                    style={
                      (styles.innerText, {bottom: 30, alignItems: 'center'})
                    }>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'white',
                        fontWeight: 'bold',
                      }}>
                      Popular 2
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    alert('you clicked popular 1');
                  }}>
                  <Image
                    source={require('../Assets/attractions.jpg')}
                    style={{
                      padding: 20,
                      width: 120,
                      height: 120,
                      borderRadius: 10,
                      opacity: 0.9,
                    }}
                  />
                  <View
                    style={
                      (styles.innerText, {bottom: 30, alignItems: 'center'})
                    }>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'white',
                        fontWeight: 'bold',
                      }}>
                      Popular 3
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    alert('you clicked popular 1');
                  }}>
                  <Image
                    source={require('../Assets/attractions.jpg')}
                    style={{
                      padding: 20,
                      width: 120,
                      height: 120,
                      borderRadius: 10,
                      opacity: 0.9,
                    }}
                  />
                  <View
                    style={
                      (styles.innerText, {bottom: 30, alignItems: 'center'})
                    }>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'white',
                        fontWeight: 'bold',
                      }}>
                      Popular 4
                    </Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
              {/* <Text style={styles.basechild}> Child One </Text>
              <Text style={styles.basechild}> Child Two </Text>
              <Text style={[styles.basechild, {alignSelf: 'stretch'}]}>
                Child Three
              </Text>
              <Text style={styles.basechild}> Child Four </Text> */}
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
    // backgroundColor: 'lightblue',
  },
  button: {
    backgroundColor: '#blue',
    borderRadius: 20,
    padding: 10,
    // marginBottom: 20,
    // marginLeft: 290,
    shadowColor: '#303838',
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
  commoncontainer: {
    flexDirection: 'row',
    // backgroundColor: 'lightgreen',
    // borderColor: 'blue',
    // borderWidth: 5,
    // margin: 5,
    // padding: 10,
  },
  colcontainer: {
    flexDirection: 'column',
    // backgroundColor: 'blue',
    // marginTop: 20,
    // borderColor: 'blue',
    // borderWidth: 5,
    // margin: 5,
    // padding: 10,
  },
  innercontainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  innerText: {
    bottom: 45,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  basechild: {
    // color: 'black',
    // borderColor: 'grey',
    // borderWidth: 2,
    textAlign: 'justify',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    // margin: 10,
    // padding: 10,
  },
  colbasechild: {
    textAlign: 'justify',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    // margin: 5,
    // padding: 5,
  },
  header: {
    flex: 1,
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
    // backgroundColor: 'green',
    flexDirection: 'column',

    justifyContent: 'flex-end',

    // marginTop: 20,
    // marginBottom: 20,
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
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});
