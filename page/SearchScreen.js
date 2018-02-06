
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';
import { profile } from '../data/data'
import { List, ListItem, SearchBar } from 'react-native-elements';
const Dimensions = require('Dimensions');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


class SearchScreen extends Component<{}> {
  // static navigationOptions = { header: null }
  static navigationOptions = {
    title: 'Search',
    headerTintColor: "white",
    headerLeft: null,
    headerStyle: {
         backgroundColor:"rgb(43,67,115 )"
       }
  };
  static propTypes = {
   post: PropTypes.array
 }
  constructor() {
      super();
      this.state={
        text:'',
        Student:[],
      }
    }
  onNext = (id) => {
    this.props.navigation.navigate('Detail', { ...id });
  };
  search(text){
    console.warn("eiededei")
  }
  componentDidMount() {
      // console.warn(profile.key)
      fetch(`http://localhost:3000/posts`)
        .then((response) => response.json())
        .then((responseJson) => {
          // console.warn(responseJson)
          this.setState({Student: responseJson})
              return responseJson

        })
        .catch((error) => {
          console.error(error);
        });



  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <StatusBar
           backgroundColor="blue"
           barStyle="light-content"
         />
      <SearchBar
        lightTheme
        containerStyle={{backgroundColor: 'white',marginTop:20}}
        round
        icon={{ type: 'font-awesome', name: 'search' }}
        onChangeText={(text) =>this.search(text)}
        placeholder='Type Here...' />
      <ScrollView>
        <List>
        {this.state.Student.map((id,i) => (

              <ListItem
                key={i}
                roundAvatar
                avatar={{ uri: id.picture }}
                title={`${id.firstname.toUpperCase()} ${id.lastname.toUpperCase()}`}
                subtitle={id.firstname}
                onPress={() => this.onNext(id)}
              />
            ))}
        </List>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  }
});



export default SearchScreen
