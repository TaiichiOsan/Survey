/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { StackNavigator } from 'react-navigation';


import LoginScreen from './page/LoginScreen'
import SearchScreen from './page/SearchScreen'
import DetailScreen from './page/DetailScreen'

const SurveyApp = StackNavigator({
				Login: { screen: LoginScreen },
        Search: { screen: SearchScreen},
        Detail: { screen: DetailScreen},

});

export default class App extends React.Component {
  render() {
    return <SurveyApp/>;
  }
}
