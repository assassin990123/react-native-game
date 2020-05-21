import React, { Component } from "react";
import { Dimensions ,StyleSheet, Image, View, TouchableOpacity, TouchableOpacityBase } from 'react-native';

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

    handleClick = (icon: any): void => {
        console.log(this.icons)

        this.icons.cat.pressed  = false;
        this.icons.vat.pressed  = false;
        this.icons.hat.pressed  = false;
        this.icons.home.pressed = false;
        this.icons.dirt.pressed = false;

        icon.pressed = true;

        this.forceUpdate();
    };

    icons = { home : { link: require('../assets/menu/Home.png'), pressed: true },
              vat  : { link: require('../assets/menu/Vat.png'),  pressed: false },
              cat  : { link: require('../assets/menu/Cat.png'),  pressed: false },
              hat  : { link: require('../assets/menu/Hat.png'),  pressed: false },
              dirt : { link: require('../assets/menu/Dirt.png'), pressed: false } };

    render(): JSX.Element {
        return (
            <View style = {styles.BottomMenu} >
                 <View style = {styles.Menu} >
                    <TouchableOpacity onPress = {() => {this.handleClick(this.icons.home)}} 
                                      style={this.icons.home.pressed ? styles.pressedButton:styles.defaultButton}>
                        <Image  source={this.icons.home.link} 
                                style={this.icons.home.pressed ? styles.imageDefaultColor:styles.imagePressedColor} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {this.handleClick(this.icons.vat)}} 
                                      style={this.icons.vat.pressed ? styles.pressedButton:styles.defaultButton}>
                        <Image  source={this.icons.vat.link} 
                                style={this.icons.vat.pressed ? styles.imageDefaultColor:styles.imagePressedColor}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => {this.handleClick(this.icons.cat)}} 
                                      style={this.icons.cat.pressed ? styles.pressedButton:styles.defaultButton}>
                        <Image  source={this.icons.cat.link} 
                                style={this.icons.cat.pressed ? styles.imageDefaultColor:styles.imagePressedColor} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {this.handleClick(this.icons.hat)}} 
                                      style={this.icons.hat.pressed ? styles.pressedButton:styles.defaultButton}>
                        <Image  source={this.icons.hat.link} 
                                style={this.icons.hat.pressed ? styles.imageDefaultColor:styles.imagePressedColor} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {this.handleClick(this.icons.dirt)}} 
                                      style={this.icons.dirt.pressed ? styles.pressedButton:styles.defaultButton}>
                        <Image  source={this.icons.dirt.link} 
                                style={this.icons.dirt.pressed ? styles.imageDefaultColor:styles.imagePressedColor} />
                    </TouchableOpacity>
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
        marginLeft: 8,
        marginRight: 8,
        marginTop: 15,
        backgroundColor: '#EE8AF0'
    },

    pressedButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 59,
        height: 59,
        borderRadius: 200,
        marginLeft: 8,
        marginRight: 8,
        marginTop: 15,
        backgroundColor: 'rgba(251, 201, 255, 0.85)'
    },
});