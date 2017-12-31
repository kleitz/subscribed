import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import { View } from '@shoutem/ui';
import { Text } from '@shoutem/ui';

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings Screen</Text>
      </View>
    );
  }
}

export default SettingsScreen;