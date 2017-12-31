import { AsyncStorage } from 'react-native';

import { dummySubscription } from '../config/data';

async function setItem(key, item) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

async function getItem(key) {
  try {
    const response = await AsyncStorage.getItem(key);
    return await JSON.parse(response);
  } catch (error) {
    console.log(error);
  }
};

const listOfSubscriptions = [];

const Database = {
  addItem: async function(newItem) {
    let currentList = listOfSubscriptions;
    let newList = [...currentList, newItem];

    listOfSubscriptions = newList;
    setItem('listOfSubscriptions', newList);
  },
  getList: async function() {
    try {
      listOfSubscriptions = await getItem('listOfSubscriptions') || dummySubscription;
      return listOfSubscriptions;
    } catch (error) {
      console.log(error);
    }
  },
  removeFromList: function(id) {
    newList = listOfSubscriptions.filter(function(item) {
      return item.id != id;
    });
    listOfSubscriptions = newList;
    setItem('listOfSubscriptions', newList);
  }
};

export default Database;