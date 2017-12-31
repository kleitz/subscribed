import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import { View, Screen, ListView } from '@shoutem/ui';
import { TouchableOpacity } from '@shoutem/ui';
import { ScrollView } from '@shoutem/ui';
import { Title, Icon, Text, Button } from '@shoutem/ui';
import { Row, Tile, Subtitle, Caption } from '@shoutem/ui';

import Database from '../components/storage.js';


class SubscriptionListScreen extends React.Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      subscriptions: []
    }
  };

  componentDidMount() {
    Database.getList().then(list => this.setState({subscriptions: list}));
  }

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
              <Subtitle style={{color: 'green'}}>10000</Subtitle>
            </Tile>
            <Tile styleName="text-centric">
              <Caption>This month</Caption>
              <Subtitle style={{ color: 'red' }}>20000</Subtitle>
            </Tile>
            <Tile styleName="text-centric">
              <Caption>Next month</Caption>
              <Subtitle>10000</Subtitle>
            </Tile>
        </View>

        <Screen>
          <ListView
            data={this.state.subscriptions}
            renderRow={this.renderRow}
          />
        </Screen>

        </ScrollView>
      </View>
    );
  }
}

export default SubscriptionListScreen;
