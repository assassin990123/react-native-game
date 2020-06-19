import React, { Component } from "react";
import { TextInput, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import * as WebBrowser from 'expo-web-browser';

import { styles } from './styles';

/*
*
    @brief: Authentication component.
*
*/

export default class StartMenu extends Component {
    constructor(props: any) {
        super(props);
        
        this.state = {
          username: String,
          password: String,
        }
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
                           
                <View style = {styles.header}> 
                    <TouchableOpacity onPress = { () => {this.onClickHandler('Header')} } 
                                      style = {styles.headerButton}/>
                    <Text style = {styles.logoText}>PEDO</Text> 
                </View>


                    <View style = {styles.inputContainer}>
                        <TextInput style          = {styles.input}
                                   placeholder           = "Номер телефона"
                                   keyboardType          = "default"
                                   underlineColorAndroid = 'transparent'

                                   onChangeText = { (username) => this.setState({username}) } />
                    </View>

                    <View style = {styles.inputContainer}>
                        <TextInput style                 = {styles.input}
                                   placeholder           = "Пароль"
                                   keyboardType          = "default"
                                   secureTextEntry       = {true}
                                   underlineColorAndroid = 'transparent'

                                   onChangeText = { (password) => this.setState({password}) } />
                    </View>
                
                    <TouchableOpacity style   = {styles.logButton}
                                      onPress = { () => Actions.CharacterMenu() }>
                        <Text style = {styles.buttonsText}>Войти</Text>
                    </TouchableOpacity>
                    
                    <Text style = {styles.agitText}>У вас еще нету аккаунта в нашей потрясающей аниме игре?????</Text>

                    <TouchableOpacity style   = {styles.regButton}
                                      onPress = { () => Actions.SigIn() }>
                        <Text style = {styles.buttonsText}>Зарегистрироваться</Text>
                    </TouchableOpacity>
                    
                <View style = {styles.donation}>
                    <TouchableOpacity style   = {styles.donatButton}
                                      onPress = { async () => { await WebBrowser.openBrowserAsync('https://patreon.com') } }>
                        <Text style = {styles.donatButtonsText}>Поддержать нас!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
        );
    }
}

