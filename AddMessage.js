import React, { Component } from 'react';
import { View, Button, ScrollView, Alert } from 'react-native';
import Constants from './Constants';
import { Icon, FormInput, FormLabel } from 'react-native-elements';

export default class AddMessage extends Component {
  state = {
    request: {
      message: {
        first_name: '',
        last_name: '',
        email: '',
        subject: '',
        description: '',
      }
    }
  };

  static navigationOptions = ({ navigation}) => {
    return {
      title: 'Add New Message',
      headerStyle: {
        backgroundColor: '#511ef4',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '100',
      },
    };
  }

  postMessage() {
    let body = JSON.stringify(this.state.request);
    return fetch(`${Constants.BASE_URL}/contact_messages`, {
      method: 'post',
      mode: 'cors',
      body: body,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then(response => {
      if (!response.ok) { throw response }
      return response.json()
    })
    .then(response => {
      this.props.navigation.navigate('Home');
    })
    .catch(error => {
      if(error.status === 422) {
        Alert.alert(
            'Something went wrong!',
            'The data that you\'ve entered is Invalid!',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        }
      });
  }

  renderMessages() {
    return this.state.messages.map(message => {
      return (
       <ListItem
            title={message.subject}
            key={message.id}
          />
      );
    });
  }

  handleInput(key, text) {
    let request = Object.assign({}, this.state.request);
    request.message[key] = text;

    this.setState({ request });
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <FormLabel>First Name</FormLabel>
        <FormInput onChangeText={(text) => {this.handleInput('first_name', text)}}/>
        <FormLabel>Last Name</FormLabel>
        <FormInput onChangeText={(text) => {this.handleInput('last_name', text)}}/>
        <FormLabel>Email</FormLabel>
        <FormInput onChangeText={(text) => {this.handleInput('email', text)}}/>
        <FormLabel>Subject</FormLabel>
        <FormInput onChangeText={(text) => {this.handleInput('subject', text)}}/>
        <FormLabel>Description</FormLabel>
        <FormInput onChangeText={(text) => {this.handleInput('description', text)}}/>
        <View style={{flexDirection: 'row', justifyContent: 'center', margin: 10}}>
          <Button
            onPress={() => {this.postMessage()}}
            title="Add Message"
            color="#511ef4"
            />
        </View>
      </ScrollView>
    );
  }
}