import React, { Component } from "react";

import FirestoreAPI from './api/FirestoreAPI';
import { View } from "react-native";

export default class App extends Component {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        // const firestore = new FirestoreAPI();
        // firestore.createUser('+79991774634');
        // firestore.getUsers().then(val => { console.log(val); })
    }

    render () {
        return (
            <View/>
      );
    }
}