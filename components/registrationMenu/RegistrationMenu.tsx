import React, { Component } from "react";
import { Actions } from 'react-native-router-flux';
import { TextInput, Text, View, TouchableOpacity, KeyboardAvoidingView, Image} from 'react-native';

import * as Font from 'expo-font';

import { styles } from './styles';

/*
*
    @brief: Authentication component.
*
*/

export default class RegistrationMenu extends Component {
    constructor(props: any) {
        super(props);
        
        this.state = {
          phone: String,
          username: String,
          password: String,
          repPassword: String,
          smsKode: String,

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
                
                    
                <TouchableOpacity style   = {styles.backButton}
                                  onPress = { () => Actions.LogIn()}>
                        <Image source={require("../../assets/arrow.png")}/>
                </TouchableOpacity>

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

                                   onChangeText = { (phone) => this.setState({phone}) } />
                    </View>

                    <View style = {styles.inputContainer}>
                        <TextInput style                 = {styles.input}
                                   placeholder           = "Имя пользователя"
                                   keyboardType          = "default"
                                   underlineColorAndroid = 'transparent'

                                   onChangeText = { (username) => this.setState({username}) } />
                    </View>
        
                    <View style = {styles.inputContainer}>
                        <TextInput style          = {styles.input}
                                   placeholder           = "Пароль"
                                   keyboardType          = "default"
                                   secureTextEntry       = {true}
                                   underlineColorAndroid = 'transparent'

                                   onChangeText = { (password) => this.setState({password}) } />
                    </View>

                    <View style = {styles.inputContainer}>
                        <TextInput style                 = {styles.input}
                                   placeholder           = "Повторите пароль"
                                   keyboardType          = "default"
                                   secureTextEntry       = {true}
                                   underlineColorAndroid = 'transparent'

                                   onChangeText = { (repPassword) => this.setState({repPassword}) } />
                    </View>
            
                    <TouchableOpacity style   = {styles.sendButton}
                                      onPress = { () => this.onClickHandler('continue') }>
                        <Text style = {styles.buttonsText}>Отправить код</Text>
                    </TouchableOpacity>

                    <View style = {styles.inputSmsContainer}>
                        <TextInput style                 = {styles.input}
                                   placeholder           = "Код подтверждения из СМС"
                                   keyboardType          = "default"
                                   underlineColorAndroid = 'transparent'

                                   onChangeText = { (smsKode) => this.setState({smsKode}) } />
                    </View>

                    <TouchableOpacity style   = {styles.continueButton}
                                      onPress = { () => Actions.CharacterMenu()}>
                        <Text style = {styles.buttonsText}>Подтвердить</Text>
                    </TouchableOpacity>
            </View>
       </KeyboardAvoidingView>
         );
    }
}