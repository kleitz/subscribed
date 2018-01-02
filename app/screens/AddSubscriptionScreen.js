import React, { Component } from 'react';
import { StatusBar, Alert } from 'react-native';
import { Permissions } from 'expo';

import moment from 'moment';
import { config } from '../config/config';
import FormSubscription from '../components/FormSubscription';

class AddNewSubscriptionScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FormSubscription 
        title=''
        price=''
        startDate={moment(new Date()).format('DD MMM, YYYY')}
        dueDate={moment(new Date()).format('DD MMM, YYYY')}
        notificationSwitch={true}
        repeatObject={config.repeatOptions[2]}
        navigation={this.props.navigation}
        isEdit={false}
      />
    );
  }

}

export default AddNewSubscriptionScreen;
