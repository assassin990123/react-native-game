import { View } from 'react-native';

import React, { Component } from "react";

import MenuButton from './components/MenuBottom/MenuBottom';
import FirestoreAPI from './api/FirestoreAPI';

export default class App extends Component {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        // const firestore = new FirestoreAPI();
        // firestore.createUser('+7999*******');
        // firestore.getUsers().then(val => { console.log(val); })
    }

    render () {
        return (
          <View>
              <MenuButton/>
          </View>
      );
    }
}
