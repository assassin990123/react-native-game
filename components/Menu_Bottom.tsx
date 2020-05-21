import React, { Component } from "react";
import { Dimensions ,StyleSheet, Image, View, TouchableOpacity } from 'react-native';

/*

    @brief: 

*/

export default class MenuBottom extends Component {
    constructor(props:any) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    state = { button: true };

    handleClick = (): void => {
        console.log('IDK WTF');
        this.setState({
            button: !this.state.button
        });
    };

    render(): JSX.Element {
        return (
            <View style = {styles.BottomMenu} >
                 <View style = {styles.Menu} >
                    <TouchableOpacity onPress = {this.handleClick} style={this.state.button ? styles.defaultButton:styles.pressedButton}>
                        <Image source={require('../assets/menu/Home.png')} style={this.state.button ? styles.imageDefaultColor:styles.imagePressedColor} />
                    </TouchableOpacity >

                    <TouchableOpacity onPress={this.handleClick} style={this.state.button ? styles.defaultButton:styles.pressedButton}>
                        <Image  source={require('../assets/menu/Vat.png')} style={this.state.button ? styles.imageDefaultColor:styles.imagePressedColor}/>
                    </TouchableOpacity >
                    
                    <TouchableOpacity onPress={this.handleClick} style={this.state.button ? styles.defaultButton:styles.pressedButton}>
                        <Image  source={require('../assets/menu/Cat.png')} style={this.state.button ? styles.imageDefaultColor:styles.imagePressedColor} />
                    </TouchableOpacity >

                    <TouchableOpacity onPress={this.handleClick} style={this.state.button ? styles.defaultButton:styles.pressedButton}>
                        <Image  source={require('../assets/menu/Hat.png')} style={this.state.button ? styles.imageDefaultColor:styles.imagePressedColor} />
                    </TouchableOpacity >

                    <TouchableOpacity onPress={this.handleClick} style={this.state.button ? styles.defaultButton:styles.pressedButton}>
                        <Image  source={require('../assets/menu/Dirt.png') } style={this.state.button ? styles.imageDefaultColor:styles.imagePressedColor} />
                    </TouchableOpacity >
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