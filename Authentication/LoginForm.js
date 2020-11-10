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

import React, {Component} from 'react';
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

import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validate: true,
      visible: true,
    };
  }
  fbLogin(){
    const result = LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    auth().signInWithCredential(facebookCredential);
  }
 login(){
    auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(() => {
      console.log('User account logged in!');
    })
    .catch(error => {
      console.error(error);
    });
  }
  handleEmailChange(inputName,inputValue) {
    const validate = !(inputValue.lenth === 0) && (inputValue.includes('@'));
    visible= false;
    this.setState(state => ({
      ...state,
      email: inputValue,
      validate,
      visible // <-- Put square brackets
    }
    ));
    console.log(this.state.validate);

  }
  handlePasswordChange(inputName,inputValue) {
    this.setState(state => ({
      ...state,
      password: inputValue,
      // <-- Put square brackets
    }
    ));
    console.log(this.state.password);

  }

  google(){
    GoogleSignin.configure({
      webClientId: '630150398750-uf8i35o6o11jjav0v63iv11j99r66puk.apps.googleusercontent.com',
    });
    const { idToken } = GoogleSignin.signIn();

          // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

          // Sign-in the user with the credential
    auth().signInWithCredential(googleCredential);
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            editable
            PlaceholderTextColor="#ABB4BD"
            value={this.state.email}
            onChangeText={value => this.handleEmailChange('email', value)}
          />
        </View>
        {!this.state.validate && <Text>klg</Text>}
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            secureTextEntry
            PlaceholderTextColor="#fff"
            value={this.state.password}
            onChangeText={value => this.handlePasswordChange('password', value)}
          />

        </View>
        <TouchableOpacity >
          <Text style={styles.forgot}>Forgot your Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} >
          <Text style={styles.loginText} onPress={this.login.bind(this)}>Login</Text>
        </TouchableOpacity>
<Text style={{fontSize:15,color:'white',marginTop:40,}}>Or Login with social Account</Text>
        <View style={{ flexDirection: 'row',justifyContent: "flex-end",marginTop:5, }}>
              
        <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5} onPress={this.fbLogin.bind(this)}>
    <Image
     source={require('../images/facebook.jpg')}
     style={styles.ImageIconStyle}
    />

    </TouchableOpacity>

    <TouchableOpacity style={styles.GoogleStyle} activeOpacity={0.5} onPress={this.google.bind(this)}>
    <Image
     source={require('../images/google.jpg')}
     style={styles.ImageIconStyle}
    />

    </TouchableOpacity>
    </View>
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
  },
  loginText:{
    fontSize: 15,
    fontWeight: 'bold',
  },
  text:{
    marginBottom: 5,
    color:'white',
    fontSize:12,
  },
  ImageIconStyle:{
    margin: 5,
    height: 25,
    width: 35,
    alignItems: 'center',
  },
  FacebookStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 55,
    borderRadius: 7,
    alignItems: 'center',
    margin: 5,
    paddingLeft: 8,
    paddingRight:8,
    
  },
  GoogleStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 55,
    borderRadius: 7,
    justifyContent: 'flex-end',
    margin: 5,
    paddingLeft: 8,
    paddingRight:8,
    paddingTop: 7,
    paddingBottom:7,
    marginLeft:55,
  },

  inputView: {
    width: 372,
    backgroundColor: '#2A2C36',
    height: 64,
    marginBottom: 7,
    justifyContent: 'center',
    padding: 10,
  },
  inputText: {
    height: 50,
    fontSize: 16,
    color: 'white',
  },
  forgot: {
    color: 'white',
    fontSize: 15,
    paddingLeft:'50%',
  },
  loginBtn: {
    width: 343,
    backgroundColor: '#FFAC30',
    borderRadius: 25,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },

});
