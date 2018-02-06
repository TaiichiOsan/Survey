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
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  AsyncStorage,
  KeyboardAvoidingView,
} from 'react-native';
import { StackNavigator } from 'react-navigation';


import {
  Button
} from 'react-native-elements'



const Dimensions = require('Dimensions');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class LoginScreen extends Component{

  static navigationOptions = { header: null }
  constructor(props) {
		super(props);
    this.state = {
      pass: true,
      txtuser: '',
      txtpass: '',
    }
  }
 passShow = () =>{
   if(this.state.pass === true){
   this.setState({pass: false})

   }
   else{
     this.setState({pass: true})
   }

 }
 // ActionBt = () =>{
 //   const { navigate } = this.props.navigation;
 //
 //   if(this.state.txtuser == 'Admin' && this.state.txtpass == 'admin'){
 //     Alert.alert(
 //       'Welcome',
 //       'Survey',
 //       [
 //         {text: 'OK' , onPress: () => navigate('Search'), style: 'cancel'},
 //       ],
 //       { cancelable: false}
 //     )
 //   }
 //   else{
 //     Alert.alert(
 //       'Error',
 //       'Wrong',
 //       [
 //         {text: 'Cancel' , style: 'cancel'},
 //       ],
 //       { cancelable: false}
 //     )
 //   }
 // }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <KeyboardAvoidingView
     style={styles.container}
     behavior="padding"
   >
      <Image
        source={require('surveystudent/img/iconbook.png')}
      />
      <Text style={{color: 'white', fontSize: 20}}>Username</Text>
      <TextInput
     style={styles.Login}
     placeholder="Username"
     onChangeText={(txtuser) => this.setState({txtuser})}
       value={this.state.txtuser}
     />
     <Text style={{color: 'white', fontSize: 20 }}>Password</Text>
      <View style={styles.passwordContainer}>
      <TextInput
      secureTextEntry={this.state.pass}
     style={styles.inputStyle}
     placeholder="Password"
     onChangeText={(txtpass) => this.setState({txtpass})}
       value={this.state.txtpass}
     />
     <TouchableOpacity onPress={this.passShow}>
     {this.state.pass == true ? <Image
        style={styles.passhide}
         source={require('surveystudent/img/visible.png')}
       /> : <Image
        style={styles.passhide}
         source={require('surveystudent/img/invisible.png')}
       />}
       </TouchableOpacity>
     </View>

    <TouchableOpacity style={styles.TouchableOpacity1} onPress={() => navigate('Search')}>
    <Text style={styles.Textfont}>Login</Text>
    </TouchableOpacity>
    </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34495e',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  Login: {
    height: 60,
    width: width - 30,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: 'white',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 20,
  },
  TouchableOpacity1:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    width: 150,
    height: 60,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: '#2c3e50',
  },
  Textfont: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white'
  },
  passwordContainer: {
    width: width - 30,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 30,
    marginTop: 10,
    backgroundColor: 'white',
  },
  inputStyle: {
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
    marginLeft: 45,

  },
  passhide: {
    width: 40,
    height: 40,
    marginRight: 5
  },

});

export default LoginScreen
