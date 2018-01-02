import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import { NavigationBar, Title, Icon, Button } from '@shoutem/ui'

class HomeNavBar extends React.Component {

  handleAddPress = () => {
    this.props.navigation.navigate('Add');
  };

  render() {
    return (
      <NavigationBar 
        styleName="inline" 
        centerComponent={ <Title>Subscriptions</Title> } 
        rightComponent={ <Button onPress={this.handleAddPress}><Icon name="plus-button" /></Button> } 
       />
    );
  }
}

export default HomeNavBar;

