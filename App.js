import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const Message = t.struct({
    fist_name: t.String,
    last_name: t.String,
    email: t.String,
    subject: t.String,
    description: t.String
});

class FormPage extends React.Component {
    constructor() {
        super();
        this.state = {
            form: {}
        };
    }

    handleSubmit = () => {
        const value = this.form;

        console.log(value);
    };

    render() {
        return (
            <View style={styles.container}>
                <Form
                    ref={c => this.form = c}
                    type={Message}
                />
                <Button
                    title="Add message"
                    onPress={this.handleSubmit}
                />
            </View>
        );
    }
}

export default class App extends React.Component {
  render() {
    return (
      <FormPage />
    );
  }
}

const styles = StyleSheet.create({
  container: {
      justifyContent: 'center',
      marginTop: 70,
      margin: 20,
      padding: 20,
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 20
  },
});
