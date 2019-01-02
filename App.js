import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import Header from './src/components/common/Header';
import Button from './src/components/common/Button';
import Spinner from './src/components/common/Spinner';
import LoginForm from './src/components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyACfNsxEd9saSGTDwV46YlWIxXVReqKXg4',
      authDomain: 'authentication-273ba.firebaseapp.com',
      databaseURL: 'https://authentication-273ba.firebaseio.com',
      projectId: 'authentication-273ba',
      storageBucket: 'authentication-273ba.appspot.com',
      messagingSenderId: '662790099454',
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size='large'/>;
    }
  }

  render() {
    return (
      <View>
        <Header headerText='Auththentication' />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
