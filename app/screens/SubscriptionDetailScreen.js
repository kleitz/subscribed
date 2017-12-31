import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import { View, ScrollView, Row, Divider } from '@shoutem/ui';
import { Title, Icon, Text, Button } from '@shoutem/ui';
import { TextInput, Switch, DropDownMenu } from '@shoutem/ui';
import { TouchableOpacity } from '@shoutem/ui';
import DateTimePicker from 'react-native-modal-datetime-picker';

import Database from '../components/storage.js';
import { config } from '../config/config';

class SubscriptionDetail extends React.Component {

  state = {
    isDateTimePickerVisible: false,
    switchOn: true,
    repeat: config.repeatOptions
  };

  _onNotificationSwitch = () => this.setState({ switchOn: !this.state.switchOn });
  _onRepeatSelect = (option) => this.setState({ selectedRepeatOption: option })
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  _handleDatePicked = (date) => this._hideDateTimePicker();

  deleteItem = (id) => {
    Database.removeFromList(id);
  }

  render() {

    const { switchOn } = this.state;
    const subscription = this.props.navigation.state.params;

    return (
      <View>
        <ScrollView>
          <Divider />
          <TextInput placeholder={'Title'} defaultValue={subscription.title} />
          <TextInput placeholder={'Amount'} keyboardType="numeric" defaultValue={`${subscription.amount.symbol} ${subscription.amount.price}`}/>
          <Divider />

          <TouchableOpacity onPress={this._showDateTimePicker}>
            <Row styleName="small">
              <Text>Issue date</Text>
              <Button onPress={this._showDateTimePicker} styleName="right-icon"><Text>{subscription.issue_date}</Text></Button>
            </Row>
          </TouchableOpacity>


          <TouchableOpacity onPress={this._showDateTimePicker}>
            <Row styleName="small">
              <Text>Due date</Text>
              <Button onPress={this._showDateTimePicker} styleName="right-icon"><Text>{subscription.due_date}</Text></Button>
            </Row>
          </TouchableOpacity>

          <TouchableOpacity>
            <Row styleName="small">
              <Text>Repeat</Text>
              <DropDownMenu
                options={this.state.repeat}
                selectedOption={this.state.selectedRepeatOption ? this.state.selectedRepeatOption : this.state.repeat[3]}
                onOptionSelected={(option) => this._onRepeatSelect(option)}
                titleProperty="title"
                valueProperty="value"
              />
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

          <View styleName="horizontal flexible">
            <Button styleName="confirmation secondary" onPress={this.deleteItem(subscription.id)}>
              <Icon name="close" />
              <Text>Delete</Text>
            </Button>
          </View>

          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
        </ScrollView>
      </View>
    );
  }
}

export default SubscriptionDetail;
