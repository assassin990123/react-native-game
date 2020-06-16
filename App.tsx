import { View, StatusBar, Dimensions } from 'react-native';

import React, { Component } from "react";

// View components.
import MenuButton from './components/MenuBottom/MenuBottom';
import HeroStatusBar from './components/HeroStatusBar/HeroStatusBar';

import FirestoreAPI from './api/FirestoreAPI';

export default class App extends Component {
    constructor(props: any) {
        super(props);

        if (Dimensions.get('screen').height - Dimensions.get('window').height > 25)
        StatusBar.setHidden(true);
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

