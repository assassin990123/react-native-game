import React, { Component } from "react";
import { Image, View, TouchableOpacity } from 'react-native';

import {styles} from './styles';

import { clickAudioEffect } from 'endpoints/AudioEffects';

/*
*
    @brief: Element of game control for change locations.
*
*/

interface MenuBottomProps {
    onSelectRoom: (selectedRoom: any, name: string) => void
}

export default class MenuBottom extends Component<MenuBottomProps> {
    constructor(props:any) {
        super(props)
    }

    handleLocationChange(key: string) {
        // @ts-ignore
        this.props.onSelectRoom(this._assets[key].room, key);
    }

    _handlers: any[] = [];

    findIndex(name: string): number {
        let i: number = 0;
        for (let [key, ] of Object.entries(this._assets)) {
            if (key === name) {
                return parseInt(i.toString());
            }
            
            i += 1;
        }

        return -1;
    }

    handleClick(icon: string): void {
        for (let [key, value] of Object.entries(this._assets)) {
            value.pressed = key === icon;
        }
        
        this._handlers[this.findIndex(icon)]();
        console.log("wat")
        clickAudioEffect();
        this.forceUpdate();
    };

    _assets = { home : { link: require('./assets/Home.png'), room: require('../../assets/rooms/BedRoom.png'),  pressed: true },
               vat  : { link: require('./assets/Vat.png'),  room: require('../../assets/rooms/BathRoom.png'), pressed: false },
               cat  : { link: require('./assets/Cat.png'),  room: require('../../assets/rooms/Hall.png'),     pressed: false },
               hat  : { link: require('./assets/Hat.png'),  room: require('../../assets/rooms/Kitchen.png'),  pressed: false },
               dirt : { link: require('./assets/Dirt.png'), room: require('../../assets/rooms/Map.png'),      pressed: false } };

    render(): JSX.Element {
        let iconsArray: JSX.Element[] = [];

        for (let [key, value] of Object.entries(this._assets)) {
            iconsArray.push(<TouchableOpacity key={key} onPress={() => {this.handleClick(key); }}
                                              style={value.pressed ? styles.pressedButton : styles.defaultButton}
                                              activeOpacity={1} >
                                    <Image source={value.link} key = {key}
                                           style={value.pressed ? styles.imagePressedColor : styles.imageDefaultColor} />
                            </TouchableOpacity>);
            
            this._handlers.push(() => {
                this.handleLocationChange(key);
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
