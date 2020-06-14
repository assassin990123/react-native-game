import React, { Component } from "react";
import { Image, View, TouchableOpacity } from 'react-native';

import {styles} from './styles';

/*
*
    @brief: Element of game control for change loactions.
*
*/

export default class MenuBottom extends Component {
    constructor(props:any) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    state = { button: true };

    _handlers: any[] = [];

    findIndex = (name: string): number => {
        let i: number = 0;
        for (let [key, ] of Object.entries(this._icons)) {
            if (key === name) {
                return parseInt(i.toString());
            }
            
            i += 1;
        }

        return -1;
    }

    handleClick = async (icon: string): Promise<void> => {
        for (let [key, value] of Object.entries(this._icons)) {
            value.pressed = false;
            
            if (key === icon) {
                value.pressed = true;
            }
        }
        
        await this._handlers[this.findIndex(icon)]();
        
        this.forceUpdate();
    };

    _icons = { home : { link: require('./assets/Home.png'), pressed: true },
               vat  : { link: require('./assets/Vat.png'),  pressed: false },
               cat  : { link: require('./assets/Cat.png'),  pressed: false },
               hat  : { link: require('./assets/Hat.png'),  pressed: false },
               dirt : { link: require('./assets/Dirt.png'), pressed: false } };

    render(): JSX.Element {
        let iconsArray: JSX.Element[] = [];

        for (let [key, value] of Object.entries(this._icons)) {
            iconsArray.push(<TouchableOpacity key={key} onPress={() => {this.handleClick(key)}} 
                                              style={value.pressed ? styles.pressedButton : styles.defaultButton}
                                              activeOpacity={1}>
                                    <Image source={value.link} key = {key}
                                           style={value.pressed ? styles.imageDefaultColor : styles.imagePressedColor} />
                            </TouchableOpacity>);
            
            this._handlers.push(() => {
                console.log('okkkkkkkkkkkkk');
            });
        }

        return (
            <View style = {styles.BottomMenu} >
                 <View style = {styles.Menu} >
                    { iconsArray }
                </View>
            </View>
        );
    }
}
