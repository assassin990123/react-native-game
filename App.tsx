import { View } from 'react-native';

import React, { Component } from "react";

// View components.
import MenuButton from './components/MenuBottom/MenuBottom';
import HeroStatusBar from './components/HeroStatusBar/HeroStatusBar';

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
              <HeroStatusBar handler={(): void => console.log('helloooooooo')} />
              <MenuButton/>
          </View>
      );
    }
}

