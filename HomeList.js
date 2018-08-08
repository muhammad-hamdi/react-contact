import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Button, Alert } from 'react-native';
import Constants from './Constants';
import { List, ListItem, Card, Header, Icon } from 'react-native-elements';

export default class HomeList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home',
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '100',
      },
      headerRight: (<Icon name="add" color="#fff" iconStyle={{marginRight: 20}} onPress={() => { navigation.navigate('AddMessage') }} underlayColor="#f4511e" />),
    };
  }

  state = {
    messages: [],
  };

  fetchMessages() {
    return fetch(`${Constants.BASE_URL}/contact_messages`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then(response => response.json())
    .then(response => {
      this.setState({ messages: response.data });
    }).catch(error => console.log(error));
  }

  componentDidMount() {
    this.fetchMessages();
  }

  deleteMessage(id, index) {
    return fetch(`${Constants.BASE_URL}/contact_messages/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then(response => {
      if (!response.ok) { throw response }
      this.removeMessage(index);
      return response.json()
    }).catch(error => {
      console.log(error);
      if(error.status === 404) {
        Alert.alert(
          'Something went wrong!',
          'The message that you requested couldn\'t be found!',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      }
    }) 
  }

  removeMessage(index) {
    let messages = this.state.messages;
    messages.splice(index, 1);

    this.setState({ messages });
  }

  renderMessages() {
    return this.state.messages.map((message, index) => {
      return (
        <Card
            title={message.subject}
            key={message.id}
          >
          <Text><Text style={{fontWeight: 'bold'}}>First Name:</Text> {message.first_name}</Text>
          <Text><Text style={{fontWeight: 'bold'}}>Last Name:</Text> {message.last_name}</Text>
          <Text><Text style={{fontWeight: 'bold'}}>Email:</Text> {message.email}</Text>
          <Text><Text style={{fontWeight: 'bold'}}>Description:</Text> {message.description}</Text>
          <View style={{flexDirection: 'row', margin: 10, marginLeft: 0}}>
            <Button
              onPress={() => {this.deleteMessage(message.id, index)}}
              title="Delete"
              color="#f4511e"
              />
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <List containerStyle={styles.list}>
            {this.renderMessages()}
          </List>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 0,
    paddingBottom: 20
  }
});