import React, { Component } from "react";
import { Dimensions ,StyleSheet, Image, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

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

    handleClick = (icon: string): void => {
        for (let [key, value] of Object.entries(this._icons)) {
            value.pressed = false;
            
            if (key === icon) {
                value.pressed = true;
            }
        }
        
        this._handlers[this.findIndex(icon)]();
        
        
        this.forceUpdate();
    };

    _icons = { home : { link: require('../assets/menu/Home.png'), pressed: true },
               vat  : { link: require('../assets/menu/Vat.png'),  pressed: false },
               cat  : { link: require('../assets/menu/Cat.png'),  pressed: false },
               hat  : { link: require('../assets/menu/Hat.png'),  pressed: false },
               dirt : { link: require('../assets/menu/Dirt.png'), pressed: false } };

    render(): JSX.Element {
        let iconsArray: JSX.Element[] = [];

        for (let [key, value] of Object.entries(this._icons)) {
            iconsArray.push(<TouchableOpacity key={key} onPress={() => {this.handleClick(key)}} 
                                              style={value.pressed ? styles.pressedButton : styles.defaultButton}>
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

const { height } = Dimensions.get('window');


const styles = StyleSheet.create({
    BottomMenu: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '100%', 
        height: 77, 
        backgroundColor: '#EE8AF0', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        top: height - 77
    },

    Menu: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap', 
    },

    imageDefaultColor: {
        tintColor: '#575DF3'
    },

    imagePressedColor: {
        tintColor: '#BD00FF'
    },

    defaultButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 59,
        height: 59,
        borderRadius: 200,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        backgroundColor: '#EE8AF0'
    },

    pressedButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 59,
        height: 59,
        borderRadius: 200,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        backgroundColor: 'rgba(251, 201, 255, 0.85)'
    },
});