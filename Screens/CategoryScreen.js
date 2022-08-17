import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
let config = require('../Config');

export default class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      category: this.props.route.params.category,
      isFetching: false,
    };
    this._loadByCategory = this._loadByCategory.bind(this);
  }
  componentDidMount() {
    this._loadByCategory();
  }
  _loadByCategory() {
    let url = config.settings.serverPath + '/api/places/' + this.state.category;
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
        this.setState({places: places});
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          refreshing={this.state.isFetching}
          onRefresh={this._loadByCategory}
          data={this.state.places}
          renderItem={({item}) => {
            return (
              <TouchableNativeFeedback
                onPress={() => {
                  this.props.navigation.navigate('detailsScreen', {
                    id: item.place_id,
                  });
                }}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'grey',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      width: 120,
                      height: 120,
                      marginVertical: 10,
                      borderRadius: 10,
                    }}></Image>
                  <View style={{padding: 10}}>
                    <Text
                      style={{width: 200, fontSize: 20, fontWeight: 'bold'}}>
                      {item.name}
                    </Text>
                    <Text style={{width: 200, fontSize: 15}}>
                      {item.operatinghours}
                    </Text>

                    <Text style={{width: 200, fontSize: 15}}>
                      {item.priceRange}
                    </Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
            );
          }}></FlatList>
        {/* <FloatingAction
          actions={action}
          color="#cd5c5c"
          onPressItem={() =>
            this.props.navigation.navigate('Create', {_refresh: this._load})
          }></FloatingAction> */}
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
