import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import { View, Text, Icon } from '@shoutem/ui';

import AddSubscriptionScreen from '../screens/AddSubscriptionScreen';
import SubscriptionListScreen from '../screens/SubscriptionListScreen';
import SubscriptionDetailScreen from '../screens/SubscriptionDetailScreen'

import HomeNavBar from '../components/nav/HomeNavBar';
import AddNavBar from '../components/nav/AddNavBar';
import EditNavBar from '../components/nav/EditNavBar';

const AddSubscription = ({navigation}) => ( <AddSubscriptionScreen navigation={navigation} /> );
const SubscriptionList = ({ navigation }) => ( <SubscriptionListScreen navigation={navigation} /> );
const SubscriptionDetail = ({ navigation }) => ( <SubscriptionDetailScreen navigation={navigation} /> );

const HomeNav = ({ navigation }) => ( <HomeNavBar navigation={navigation} /> );
const AddNav = ({ navigation }) => ( <AddNavBar navigation={navigation} /> );
const EditNav = ({ navigation }) => ( <EditNavBar navigation={navigation} /> );

const SubscriptionStack = StackNavigator({
  Home: { 
    screen: SubscriptionList,
    navigationOptions: {
      header: HomeNav
    }
  },
  Details: { 
    screen: SubscriptionDetail,
    navigationOptions: {
      header: EditNav
    },
  }
});

export const AddSubscriptionStack = StackNavigator({
  Add: {
    screen: AddSubscription,
    navigationOptions: {
      header: AddNav
    },
  },
});

const Root = StackNavigator({
  Home: {
    screen: SubscriptionStack
  },
  Add: {
    screen: AddSubscriptionStack
  }
}, {
  mode: 'modal',
  headerMode: 'none'
});

export default Root;
