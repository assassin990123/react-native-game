import React, { Component } from "react";
import { TextInput, Text, View, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';


import * as Font from 'expo-font';

import { styles } from './styles';

//const navigation=useNavigation();

/*
*
    @brief: Authentication component.
*
*/

export default class StartMenu extends Component {
    constructor(props: any) {
        super(props);
        
        this.state = {
          characterName: String,
        }

        this.state = {
            fontLoaded: false
        };
    }


     componentDidMount = async() => {
        await Font.loadAsync({
            'Montserrat-Regular':require('../../assets/fonts/Montserrat-Regular.ttf'),
            'Montserrat-Black':require('../../assets/fonts/Montserrat-Black.ttf'),
            'Montserrat-Medium':require('../../assets/fonts/Montserrat-Medium.ttf'),
            'Montserrat-Light':require('../../assets/fonts/Montserrat-Light.ttf'),
            'Montserrat-Italic':require('../../assets/fonts/Montserrat-Italic.ttf'),
            'Montserrat-Thin':require('../../assets/fonts/Montserrat-Thin.ttf')
        });

        this.setState( { fontLoaded: true } );
    }

    onClickHandler = (viewId: String) => {
        alert('Button pressed ' + viewId);
    }

    render() {
        return (
        <KeyboardAvoidingView
            behavior={'padding'}
            style={styles.content}
          >
            <View style = {styles.content}>

                <TouchableOpacity style   = {styles.backButton}
                                    onPress = { () => {} }>
                        <Image source={require("../../assets/arrow.png")}/>
                </TouchableOpacity>

                <View style = {styles.header}>
                    <Text style = {styles.headerText}>Настройте внешний вид вашего персонажа!</Text>
                </View>
                
                <View style = {styles.inputContainer}>
                        <TextInput style          = {styles.input}
                                   placeholder           = "Имя персонажа"
                                   keyboardType          = "default"
                                   underlineColorAndroid = 'transparent'

                                   onChangeText = { (characterName) => this.setState({characterName}) } />
                </View>

            </View>

        </KeyboardAvoidingView>
        );
    }
}
