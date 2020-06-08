import React, { Component } from "react";
import StartMenu from './components/startMenu';

import FirestoreAPI from './api/FirestoreAPI';

export default class App extends Component {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        // const firestore = new FirestoreAPI();
        // firestore.getUsers().then( (value) => { console.log(value); });
        // firestore.setUserFields('asdfghjkl', {tes: "qwertyu", test: 'adsdasd'}).then( value => {console.log(value)} )
        // firestore.getUserFields('idkasdasdasd');

        // firestore.createUser('some_user_228').then((res) => {console.log(res)});

        const firestore = new FirestoreAPI();
        firestore.createUser('+79991774634');
        firestore.getUsers().then(val => { console.log(val); })
    }

    render () {
        return (
            <StartMenu/>
      );
    }
}