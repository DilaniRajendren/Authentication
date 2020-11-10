/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Home from './Home';
import LoginForm from './Authentication/LoginForm';
import SignUpForm from './Authentication/SignUpForm';
import ForgetPassword from './Authentication/ForgetPassword.js';
export default class App extends Component{
  render(){
    return(
      <Home/>
    )
  }
}