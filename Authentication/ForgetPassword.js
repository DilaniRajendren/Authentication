/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
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
  TextInput,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',

      validate: true,
      password:true,
    };
  }
  handleEmailChange(inputName,inputValue) {
    const validate = !(inputValue.lenth === 0) && (inputValue.includes('@'));
    this.setState(state => ({
      ...state,
      email: inputValue,
      validate, // <-- Put square brackets
    }
    ));
    console.log(this.state.validate);

  }

  resetpassword(){
    auth().sendPasswordResetEmail(this.state.email);
  }

  render() {
    return (
      <View style={styles.container}>
          <View>
              <Text style={styles.Sendtext}>Forgot Password</Text>
          </View>
          <Text style={styles.password}>Please Enter your email address. You will recieve a link to create a new password via email</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            editable
            PlaceholderTextColor="white"
            value={this.state.email}
            onChangeText={value => this.handleEmailChange('email', value)}
          />
        </View>


        <TouchableOpacity style={styles.sendBtn} onPress={this.resetpassword.bind(this)}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1F28',
    alignItems: 'center',
    justifyContent: 'center',
    height: 823,
    width: 411,
  },

  password: {
      fontSize:15,
      color:'white',
      paddingLeft: 10,
      alignItems: 'center',
      paddingRight: 10,
  },
  sendText:{
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  Sendtext:{
    marginBottom: 110,

    top: 0,
    fontSize: 30,
    color: 'white',
    paddingRight: '40%',
  },
  inputView: {
    width: 343,
    backgroundColor: '#2A2C36',
    height: 64,
    marginBottom: 8,
    justifyContent: 'center',
    padding: 10,
  },
  inputText: {
    height: 50,
    fontSize: 16,
    color: 'white',
  },

  sendBtn: {
    width: 343,
    backgroundColor: '#FFAC30',
    borderRadius: 25,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },

});
