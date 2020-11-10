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

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password1: '',
      password2:'',
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
handlePassword1Change(inputName, inputValue){
  this.setState(state =>({
    password1: inputValue
  }))
}
handlePassword2Change(inputName,inputValue){

  this.setState(state => ({
    password2: inputValue,

  }))
  console.log(this.state.password1);
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
signup(){
  console.log(this.state.email);
  auth().createUserWithEmailAndPassword(this.state.email,this.state.password1).then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    console.error(error);
  });
}
  render() {
    return (
      <View style={styles.container}>
          <View styles={styles.signupalign}>
              <Text style={styles.signuptext}>Sign up</Text>
          </View>
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
        {!this.state.validate && <Text>klg</Text>}
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            secureTextEntry
            PlaceholderTextColor="white"
            value={this.state.password1}
            onChangeText={value => this.handlePassword1Change('password1', value)}
          />

        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            secureTextEntry
            color = "white"
            PlaceholderTextColor="#fff"
            value={this.state.password2}
            onChangeText={value => this.handlePassword2Change('password2', value)}
          />
{!this.state.password && <Text style={styles.password}> Password Doesnot Match</Text>}
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Already Have an account?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupBtn} onPress={this.signup.bind(this)}>
          <Text style={styles.signupText}>SignUp</Text>
        </TouchableOpacity>
        <Text style={{fontSize:15,color:'white',marginTop:40,}}>Or SignUp with social Account</Text>
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
    height: 823,
    width: 411,
  },
  signupalign:{
    paddingTop: -3,
    position: 'absolute',
  },
  password:{
    fontSize: 12,
    color: 'red',
  },
  signupText:{
    fontSize: 15,
    fontWeight: 'bold',
  },
  signuptext:{
    marginBottom: 50,
    alignSelf: 'flex-end',
    marginTop: -5,
    top: 0,
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    paddingRight: '70%',
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

  forgot: {
    color: 'white',
    fontSize: 15,
    paddingLeft:'50%',
  },
  signupBtn: {
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
