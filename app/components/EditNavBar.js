import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import { NavigationBar, Title, Text, Icon, Button } from '@shoutem/ui'

class EditNavBar extends React.Component {

  dismiss = () => {
    this.props.navigation.goBack();
  }

  render() {

    return (
      <NavigationBar
        styleName="inline"
        centerComponent={<Title>Details</Title>}
        leftComponent={(
          <Button styleName="clear" onPress={this.dismiss}>
            <Text>Cancel</Text>
          </Button>
        )}
        rightComponent={(
          <Button styleName="clear" onPress={this.dismiss}>
            <Text>Save</Text>
          </Button>
        )}
      />
    );
  }
}

export default EditNavBar;

