import { View, StatusBar, Dimensions } from 'react-native';
import React, { Component } from "react";
import * as Font from 'expo-font';

import Routes from './Routes';

export default class App extends Component {
    constructor(props: any) {
        super(props);

        if (Dimensions.get('screen').height - Dimensions.get('window').height < 26) {
            StatusBar.setHidden(true);
        }
    }

    state = { fontLoaded: false };

    componentDidMount = async() => {
      await Font.loadAsync({
          'Montserrat-Regular'  :require('./assets/fonts/Montserrat-Regular.ttf'),
          'Montserrat-Black'    :require('./assets/fonts/Montserrat-Black.ttf'),
          'Montserrat-Medium'   :require('./assets/fonts/Montserrat-Medium.ttf'),
          'Montserrat-Light'    :require('./assets/fonts/Montserrat-Light.ttf'),
          'Montserrat-Italic'   :require('./assets/fonts/Montserrat-Italic.ttf'),
          'Montserrat-Thin'     :require('./assets/fonts/Montserrat-Thin.ttf'),
          'Montserrat-SemiBold' :require('./assets/fonts/Montserrat-SemiBold.ttf')
      });

      this.setState( { fontLoaded: true } );
  }

    render () {
      if (this.state.fontLoaded){
          return (
              <Routes />
        );
      } else {
        return ( <View></View> )
      }
    }
   
}