import React, { Component } from "react";
import StartMenu from './components/startMenu';

import { firebaseConfig } from './api/ApiKeys';

import * as firebase from 'firebase';

export default class App extends Component {
  constructor(props: any) {
    super(props);
 }

  componentDidMount() {
    if (! firebase.apps.length) { firebase.initializeApp(firebaseConfig); } 
    else { console.log('wtf'); }
    
    let dbh = firebase.firestore(); 

    console.log(firebase);
    
    dbh.collection('users_props').get()
    .then((snapshot: any) => {
      snapshot.forEach((doc: any) => {
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch((err: any) => {
      console.log('Error getting documents', err);
    });
  }

  render () {
    return (
      <StartMenu/>
  );
  }
}