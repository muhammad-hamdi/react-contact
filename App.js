import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Constants } from 'expo';
import { Header } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';

import HomeList from './HomeList';
import AddMessage from './AddMessage';

const RootStack = createStackNavigator(
  {
    Home: HomeList,
    AddMessage: AddMessage,
  },
  {
    initialRouteName: 'Home',
  }
);


export default class App extends Component {
  render() {
    return (
      <RootStack />
    );
  }
}