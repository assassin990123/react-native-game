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

import { Auth } from 'aws-amplify';

export default class RegistrationMenu extends Component {
    state = {
        phone_number: '',
        username: '',
        password: '',
        email: '',
        smsKode: '',

      }

    constructor(props: any) {
        super(props);
    }

    onClickHandler = (viewId: String) => {
        alert('Button pressed ' + viewId);
    }

    signUp = async () =>  {
        const username:any = this.state.username
        const password:any = this.state.password
        const email:any = this.state.email
        const phone_number:any = this.state.phone_number
        await Auth.signUp({
            username,
            password,
            attributes:{
                email,
                phone_number
            }
        }).then(()=>console.log('signup successful'))
          .catch(error=>{console.log('signup error', error), alert('oops' + error)});
    }

    confirmSignUp = async() => {
        await Auth.confirmSignUp(this.state.username, this.state.smsKode)
            .then(()=>console.log('successful confirm singtup'))
            .catch(error=>console.log('error confirming signing up',error));
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

                                   onChangeText = { (username) => this.setState({username}) } />
                    </View>

                    <View style = {styles.inputContainer}>
                        <TextInput style                 = {styles.input}
                                   placeholder           = "Имя пользователя"
                                   keyboardType          = "default"
                                   underlineColorAndroid = 'transparent'

                                   onChangeText = { (phone_number) => this.setState({phone_number}) } />
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
                                   placeholder           = "Email"
                                   keyboardType          = "default"
                                   underlineColorAndroid = 'transparent'

                                   onChangeText = { (email) => this.setState({email}) } />
                    </View>
            
                    <TouchableOpacity style   = {styles.sendButton}
                                      onPress = { () => this.signUp()}>
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
                                      onPress = { () => this.confirmSignUp()}>
                        <Text style = {styles.buttonsText}>Подтвердить</Text>
                    </TouchableOpacity>
            </View>
       </KeyboardAvoidingView>
         );
    }
}

