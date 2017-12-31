import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import { View, ScrollView, Row, Divider } from '@shoutem/ui';
import { Title, Icon, Text, Button } from '@shoutem/ui';
import { TextInput, Switch, DropDownMenu } from '@shoutem/ui';
import { TouchableOpacity } from '@shoutem/ui';
import DateTimePicker from 'react-native-modal-datetime-picker';

import Database from '../components/storage.js';
import { config } from '../config/config';

class AddNewSubscriptionScreen extends React.Component {

  state = {
    title: '',
    price: '',
    startDate: '',
    dueDate: '',
    isStartDateTimePickerVisible: false,
    repeat: config.repeatOptions,
    isDueDateTimePickerVisible: false,
    switchOn: true,
    selectedRepeatOption: config.repeatOptions[3]
  };

  save = () => {
    const item = {
      id: this.getRandomInt(1,100),
      title: this.state.title,
      amount:{symbol: 'Rs.', price: this.state.price || 0},
      issue_date: this.state.startDate,
      due_date: this.state.dueDate,
      repeat: this.state.selectedRepeatOption.value,
      notfication: this.state.switchOn
    }
    console.log(item);
    Database.addItem(item);
    this.props.navigation.navigate('Home', {});
  }

  _onNotificationSwitch = () => this.setState({ switchOn: !this.state.switchOn });
  _onRepeatSelect = (option) => this.setState({ selectedRepeatOption: option })

  _showStartDateTimePicker = () => this.setState({ isStartDateTimePickerVisible: true });
  _showDueDateTimePicker = () => this.setState({ isDueDateTimePickerVisible: true });

  _hideStartDateTimePicker = () => this.setState({ isStartDateTimePickerVisible: false });
  _hideDueDateTimePicker = () => this.setState({ isDueDateTimePickerVisible: false });

  _handleStartDatePicked = (date) => {
    this.setState({startDate: date});
    this._hideStartDateTimePicker();
  };

  _handleDueDatePicked = (date) => {
    this.setState({dueDate: date});
    this._hideDueDateTimePicker();
  };

  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  render() {
    const { switchOn } = this.state;

    return (
      <View>
        <ScrollView>
          <Divider />
          <TextInput placeholder={'Title'} 
            onChangeText={(title) => this.setState({title})}
            value={this.state.title} />

          <TextInput placeholder={'Amount'} keyboardType="numeric"
            onChangeText={(price) => this.setState({price})}
            value={this.state.price} />
          <Divider />

          <TouchableOpacity onPress={this._showStartDateTimePicker}>
            <Row styleName="small">
              <Text>Subscription start date</Text>
              <Button onPress={this._showStartDateTimePicker} styleName="right-icon"><Text>21 June 2017</Text></Button>
            </Row>
          </TouchableOpacity>

          <TouchableOpacity>
            <Row styleName="small">
              <Text>Repeat</Text>
              <DropDownMenu
                options={this.state.repeat}
                selectedOption={this.state.selectedRepeatOption}
                onOptionSelected={(option) => this._onRepeatSelect(option)}
                titleProperty="title"
                valueProperty="value"
              />
            </Row>
          </TouchableOpacity>


          <TouchableOpacity onPress={this._showDueDateTimePicker}>
            <Row styleName="small">
              <Text>Next due date</Text>
              <Button onPress={this._showDueDateTimePicker} styleName="right-icon"><Text>21 June 2017</Text></Button>
            </Row>
          </TouchableOpacity>

          <Divider />

          <TouchableOpacity onPress={this._onNotificationSwitch}>
            <Row styleName="small">
              <Text>Notification</Text>
              <Switch onValueChange={value => this._onNotificationSwitch()} value={switchOn} />
            </Row>
          </TouchableOpacity>

          <Divider />

          <View styleName="horizontal">
            <Button styleName="confirmation secondary" onPress={this.save}>
              <Icon name="checkbox-on" />
              <Text>SAVE</Text>
            </Button>
          </View>

          <DateTimePicker
            isVisible={this.state.isStartDateTimePickerVisible}
            onConfirm={this._handleStartDatePicked}
            onCancel={this._hideStartDateTimePicker}
          />
          <DateTimePicker
            isVisible={this.state.isDueDateTimePickerVisible}
            onConfirm={this._handleDueDatePicked}
            onCancel={this._hideDueDateTimePicker}
          />

        </ScrollView>
      </View>
    );
  }
}

export default AddNewSubscriptionScreen;
