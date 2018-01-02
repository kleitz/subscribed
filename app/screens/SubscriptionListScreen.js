import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import moment from 'moment';

import { View, Screen, ListView } from '@shoutem/ui';
import { TouchableOpacity } from '@shoutem/ui';
import { ScrollView } from '@shoutem/ui';
import { Title, Icon, Text, Button } from '@shoutem/ui';
import { Row, Tile, Subtitle, Caption } from '@shoutem/ui';

import Database from '../services/storage.js';

class SubscriptionListScreen extends React.Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      subscriptions: [],
      pastMonthTotal: 0,
      currentMonthTotal: 0,
      nextMonthTotal: 0
    }
  };

  componentDidMount() {
    this.populateList();
  }

  populateList = () => {
    Database.getAllSubscriptions().then(list => {
      this.setState({subscriptions: list}, this.updateMonthsTotal);
    });
  };

  updateMonthsTotal = () => {
    const currentMonth = moment(new Date()).format('MMM');
    const pastMonth = moment(new Date()).subtract(1, 'months').format('MMM');
    const nextMonth = moment(new Date()).add(1, 'months').format('MMM');

    var pastMonthTotal = 0;
    var currentMonthTotal = 0;
    var nextMonthTotal = 0;

    this.state.subscriptions.forEach(function(subscription) {
      const subscriptionMonth = moment(subscription.due_date, 'DD MMM, YYYY').format('MMM');

      if (subscriptionMonth == pastMonth) { pastMonthTotal += parseInt(subscription.amount.price); }
      if (subscriptionMonth == currentMonth) { currentMonthTotal += parseInt(subscription.amount.price); }
      if (subscriptionMonth == nextMonth) { nextMonthTotal += parseInt(subscription.amount.price); }
    });

    this.setState({
      pastMonthTotal: pastMonthTotal,
      currentMonthTotal: currentMonthTotal,
      nextMonthTotal: nextMonthTotal
    });
  };

  onSeeDetails = (subscription) => {
    this.props.navigation.navigate('Details', { ...subscription });
  };

  renderRow(subscription) {
    return (
      <TouchableOpacity key={subscription.id} onPress={() => this.onSeeDetails(subscription) }>      
        <Row>
          <Icon name="web" />
          <View styleName="vertical stretch space-between">
            <Subtitle>{subscription.title}</Subtitle>
            <Subtitle>{subscription.amount.symbol} {subscription.amount.price}</Subtitle>
            <Caption>Due on {subscription.due_date}</Caption>
          </View>
          <Icon styleName="disclosure" name="right-arrow" />
        </Row>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      
      <View styleName="flexible">
        <ScrollView>
          <View styleName="horizontal flexible">
            <Tile styleName="text-centric">
              <Caption>Last month</Caption>
              <Subtitle style={{color: 'green'}}> ₹ {this.state.pastMonthTotal}</Subtitle>
            </Tile>
            <Tile styleName="text-centric">
              <Caption>This month</Caption>
              <Subtitle style={{ color: 'red' }}> ₹ {this.state.currentMonthTotal}</Subtitle>
            </Tile>
            <Tile styleName="text-centric">
              <Caption>Next month</Caption>
              <Subtitle> ₹ {this.state.nextMonthTotal}</Subtitle>
            </Tile>
        </View>

        <Screen>
          <ListView
            data={this.state.subscriptions}
            renderRow={this.renderRow}
            onRefresh={this.populateList}
          />
        </Screen>

        </ScrollView>
      </View>
    );
  }
}

export default SubscriptionListScreen;
