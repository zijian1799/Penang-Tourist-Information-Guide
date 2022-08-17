import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TimePickerAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      hour: null,
      minute: null,
      timeText: '',
      date: new Date(Date.now()),
      openPicker: false,
    };
    this.openTimePicker = this.openTimePicker.bind(this);
    this.onDateSelected = this.onDateSelected.bind(this);
  }
  openTimePicker() {
    this.setState({openPicker: true});
  }
  onDateSelected(event, value) {
    this.setState({
      date: value,
      openPicker: false,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.openTimePicker}>
          <View>
            <TextInput
              style={styles.input}
              value={this.state.date.formatted()}
              placeholder="Event Time"
              editable={false}
              underlineColorAndroid={'transparent'}
            />
          </View>
        </TouchableWithoutFeedback>

        {this.state.openPicker && (
          <DateTimePicker
            value={this.state.date}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            is24Hour={false}
            onChange={this.onDateSelected}
            style={styles.datePicker}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10,
  },
  input: {
    fontSize: 20,
    height: 48,
    color: 'black',
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
});
