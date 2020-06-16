import React, { Component } from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import * as Font from 'expo-font';

import {styles} from './styles';

/*
*
    @brief: Status bar to display characters needs, such as sleep, food, lvl and etc.
*
*/

interface IHeroStatusBar {
    handler: Function,
}

export default class HeroStatusBar extends Component<IHeroStatusBar> {
    constructor(props: any) {
        super(props);
        props.handler();
    }

    state = {
        _icons: {
            satietly:  { link: require('./assets/satiety.png'),   currentState: 100 },
            sleep:     { link: require('./assets/sleep.png'),     currentState: 100 },
            cleanness: { link: require('./assets/cleanness.png'), currentState: 100 },
            mood:      { link: require('./assets/mood.png'),      currentState: 100 }
        }
    };

    getCurrentColor = (currntStateNum: number) => {
        if (currntStateNum < 50) {
            return StyleSheet.create( { color: {backgroundColor: '#E23535'}} );
        } else if (currntStateNum > 50 && currntStateNum < 80) {
            return StyleSheet.create( { color: {backgroundColor: '#FCB712'}} );
        } else {
            return StyleSheet.create( { color: {backgroundColor: '#4EB734'}} );
        }
    };

    componentDidMount = async () => {
        await Font.loadAsync({
            'Montserrat-Regular':require('../../assets/fonts/Montserrat-Regular.ttf'),
            'Montserrat-Black':require('../../assets/fonts/Montserrat-Black.ttf'),
            'Montserrat-Medium':require('../../assets/fonts/Montserrat-Medium.ttf'),
            'Montserrat-Light':require('../../assets/fonts/Montserrat-Light.ttf'),
            'Montserrat-Italic':require('../../assets/fonts/Montserrat-Italic.ttf'),
            'Montserrat-Thin':require('../../assets/fonts/Montserrat-Thin.ttf')
        }).then(() => this.setState( { fontLoaded: true } ))
          .catch(error => console.error('[HeroStatusBar]: Cant load fonts.' + error));
    }

    render(): JSX.Element {
        let JSXElements: JSX.Element[] = [];

        for (let [key, value] of Object.entries(this.state._icons)) {
            JSXElements.push(<TouchableOpacity key={key} onPress={() => {}} 
                                              style={[styles.iconStyleSubMenu, this.getCurrentColor(value.currentState).color]}
                                              activeOpacity={1}>
                                    <Image source={value.link} key = {key} />
                            </TouchableOpacity>);
        }

        return (
            <View style={styles.StatusBar}>
                <TouchableOpacity style={[styles.iconStyle, styles.defaultMargin]}>
                    <Text style={styles.levelText}>12</Text>
                </TouchableOpacity>

                <View style={[styles.StatusBarSubMenu, styles.defaultMargin]}>
                    {JSXElements}
                </View>

                <TouchableOpacity style={[styles.iconStyle, styles.defaultMargin]}>
                    <Image source={require('./assets/settings.png')} key = {'setting'} />
                </TouchableOpacity>              
            </View>
        );
    }
}
