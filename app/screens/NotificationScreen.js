import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import { View } from '@shoutem/ui';
import { Text } from '@shoutem/ui';

class NotificationScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Notification Screen</Text>
      </View>
    );
  }
}

export default NotificationScreen;