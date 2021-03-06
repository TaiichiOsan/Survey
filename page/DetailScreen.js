/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';
import PhotoView from 'react-native-photo-view';
import {Card ,List, ListItem, SearchBar,FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Camera from 'react-native-camera';
import RNFetchBlob from 'react-native-fetch-blob'

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Button,
  Modal,
  Alert,
  PixelRatio,
  ImageBackground,
  AsyncStorage,
  FlatList,
  KeyboardAvoidingView
} from 'react-native';

const Dimensions = require('Dimensions');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
var ImagePicker = require('react-native-image-picker');

var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class DetailScreen extends Component<{}> {
  static propTypes = {
   profile: PropTypes.array,
   picture: PropTypes.string,
   url: PropTypes.string,
 }
  static navigationOptions = ({ navigation }) => {
  const {state} = navigation;
  return {
    title: `${navigation.state.params.firstname} ${navigation.state.params.lastname}`,
    headerTintColor: "white",
    headerStyle: {
         backgroundColor:"rgb(43,67,115 )"
       }
  };
};

constructor(props) {
    super(props);
    profile = this.props.navigation.state.params


this.state = {
    avatarSource: null,
    modalVisible: false,
     loading: false,
     imageview: "",
     text:"",
     storageimg:[],
     input:'',
     alreadyurl: true,
  };
}

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        // console.warn('User cancelled photo picker');
      }
      else if (response.error) {
        // console.warn('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        // console.warn('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        let setsource = response.uri

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
       //  uploadImage(response.uri)
       // .then(url => this.setState({ uploadURL: url }))
       // .catch(error => console.log(error))
       this.setState({loading: true})

        this.setState({
          avatarSource: source
        });
        //setItem

        // console.warn("eieiei",this.state.storageimg.length)
        if(this.state.alreadyurl == true){
          this.setState({input: 'POST'})
          url = 'http://localhost:3000/images/'
        }else{
          this.setState({input: 'PUT'})
          url = `http://localhost:3000/images/${profile.id}`
        }
        let SampleArray = this.state.storageimg
        SampleArray.push(setsource)
        this.setState({storageimg: SampleArray})
        fetch(url, {
        method: `${this.state.input}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id : profile.id,
          url: this.state.storageimg,
          text: this.state.text
        }),
        }).then((response) => response.json())
          .then((responseJson) => {
            // console.warn(responseJson)
            return responseJson;
        })
        .catch((error) => {

        });
          }
      });
  }

  saveData() {
    fetch(`http://localhost:3000/images/${profile.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id : profile.id,
      url: this.state.storageimg,
      text: this.state.text
    }),
    }).then((response) => response.json())
      .then((responseJson) => {
        // console.warn(responseJson)
        return responseJson;
    })
    .catch((error) => {

    });

}
  componentDidMount() {
      // console.warn(profile.key)
      fetch(`http://localhost:3000/images/${profile.id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.url == null){
              // console.warn("true")
              this.setState({alreadyurl: true})
            }else{
              // console.warn("false",responseJson.url.length)
              this.setState({alreadyurl: false})
        let test = responseJson.url
        let text1= responseJson.text
        this.setState({text: text1})
        this.setState({storageimg: test})
        // console.warn(this.state.mapurl)
            // console.warn("noundefined",responseJson)
            }
            // console.warn("eiei",responseJson)

              return responseJson

        })
        .catch((error) => {
          console.error(error);
        });



  }
  modalimageView(value){
    alert(value)
  }
  openModal(value) {
      this.setState({modalVisible:true});
      this.setState({imageview:value})
    }

    closeModal() {
      this.setState({modalVisible:false});
    }
    removeImage(i){

      this.state.storageimg.splice(i,1)
      fetch(`http://localhost:3000/images/${profile.key}`, {
       method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id : profile.key,
            url: this.state.storageimg
          }),
          }).then((response) => response.json())
            .then((responseJson) => {
              // console.warn(responseJson)
              return responseJson;
        })
        .catch((error) => {

        });
      // AsyncStorage.removeItem(profile.firstname)
      // AsyncStorage.setItem(profile.firstname,JSON.stringify(this.state.storageimg))
      this.setState({storageimg: this.state.storageimg})
    }

  render() {
    return (
      <View style={styles.container}>
          <View style={{flex: 3}}>
            <ScrollView>
            <Modal
                visible={this.state.modalVisible}
                animationType={'slide'}
                onRequestClose={() => this.closeModal()}
                style={{backgroundColor:'black'}}
            >
            <PhotoView
                source={{uri: this.state.imageview}}
                minimumZoomScale={0.5}
                maximumZoomScale={3}
                androidScaleType="center"
                scale={1}
                onViewTap={() => this.closeModal()}
                onLoad={() => console.log("Image loaded!")}
                style={{flex: 1,width: width, height: 300}} />
            </Modal>
            <Card
            containerStyle={{borderRadius: 20}}>

            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <View style={styles.avatarContainer}>
              <Text style={{fontSize: 20}}>Add Photo</Text>
                </View>
              </TouchableOpacity>
            </Card>
            {
            this.state.storageimg.map((u, i) => {
              return (
              <Card containerStyle={{borderRadius : 20}}>
                <View key={i} >
                 <View style={{justifyContent:'flex-end',flexDirection:'row'}}>
                  <TouchableOpacity >
                    <Text style={{fontSize: 20}} onPress={() => this.removeImage(i)}>Delete</Text>
                  </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => this.openModal(u)} style={{justifyContent:'center',alignItems:'center'}}>
                    <Image
                      style={{width: 200 , height: 200 ,marginVertical: 5,borderRadius: 20}}
                      resizeMode="cover"
                      source={{ uri: u }}
                    />
                  </TouchableOpacity>
                </View>
              </Card>
              );
            })
          }
        </ScrollView>
      </View>
      <View style={styles.container1}>
        <FormLabel>Remarks</FormLabel>
          <View style={{flex: 1}}>
              <TextInput
                style={styles.Remarkstxt}
                placeholder="Your Placeholder"
                editable={true}
                multiline={true}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}/>
          </View>
          <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
             <TouchableOpacity style={styles.Savebt} onPress={() => this.saveData()}>
                   <View>
                   <Text style={styles.Savetxt}>Save</Text>
                   </View>
             </TouchableOpacity>

          </View>
      </View>


   </View>
    );
  }

}

const styles = StyleSheet.create({
  avatarContainer: {

    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  },
  container: {
    flex: 1,
    backgroundColor: '#34495e',
  },
  container1: {
    flex: 2,
    backgroundColor: 'white',
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
    borderColor: 'gray',
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
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: '#2c3e50',
  },
  Textfont: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white'
  },
  modalContainer: {
    flex: 1,

    backgroundColor: 'black',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  preview: {
				flex: 1,

			},
  Actionbutton: {
    position: 'absolute',
      bottom: 25,
      padding: 16,
      right: 20,
      left: 20,
      borderRadius: 20,
      alignItems: 'center',
      backgroundColor: 'white'
  },
  actionButton1: {
    padding: 30,

        alignItems: 'flex-end',
  },
  Savebt: {

    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    backgroundColor: '#2c3e50',
    borderWidth: 2,
    borderRadius: 20,
  },
  Savetxt: {
    color: 'white',
    fontSize: 20,
    marginVertical: 10
  },
  Remarkstxt: {
    fontSize: 20,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default DetailScreen
