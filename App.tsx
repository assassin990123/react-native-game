import React, { Component } from "react";
import StartMenu from './components/startMenu';

import FirestoreAPI from './api/FirestoreAPI';

export default class App extends Component {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        const firestore = new FirestoreAPI();
        let res = firestore.getUsers().then( (value) => { console.log(value); });
    }

    render () {
        return (
          <StartMenu/>
      );
    }
}