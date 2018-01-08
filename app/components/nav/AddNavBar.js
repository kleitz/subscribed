import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import { NavigationBar, Title, Text, Icon, Button } from '@shoutem/ui'
import { Actions } from 'react-native-router-flux';

class AddNavBar extends React.Component {

  dismiss = () => {
    Actions.pop();
  }

  render() {

    return (
      <NavigationBar
        styleName="inline"
        centerComponent={<Title>New Subscription</Title>}
        leftComponent={(
          <Button styleName="clear" onPress={this.dismiss}>
            <Text>Cancel</Text>
          </Button>
        )}
      />
    );
  }
}

export default AddNavBar;

