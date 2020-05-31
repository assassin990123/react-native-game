import React, { Component } from "react";
import { TextInput, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
//import { useNavigation } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
//import RegistrationMenu from './components/registrationMenu/RegistrationMenu';


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
          username: String,
          password: String,
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
                           
                <View style = {styles.header}> 
                    { /* TODO: There should be logo. */ }
                    <TouchableOpacity onPress = { () => {this.onClickHandler('Header')} } 
                                      style = {styles.headerButton}/>
                    <Text style = {styles.logoText}>PEDO</Text> 
                </View>

              
                    { /* Login panel. */ }
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
                                      onPress = { () => this.onClickHandler('login') }>
                        <Text style = {styles.buttonsText}>Войти</Text>
                    </TouchableOpacity>
                    
                    <Text style = {styles.agitText}>У вас еще нету аккаунта в нашей потрясающей аниме игре?????</Text>

                    <TouchableOpacity style   = {styles.regButton}
                                      onPress = { () => this.onClickHandler('patrion')}>
                        <Text style = {styles.buttonsText}>Зарегистрироваться</Text>
                    </TouchableOpacity>
                    
                <View style = {styles.donation}>
                    <TouchableOpacity style   = {styles.donatButton}
                                      onPress = { () => this.onClickHandler('patrion') }>
                        <Text style = {styles.donatButtonsText}>Поддержать нас!</Text>
                    </TouchableOpacity>
                </View>

              { /* <View style = {styles.links}>

                   // { /* Login usin' soical media.  }

                    <TouchableOpacity style   = {styles.socialLoginLink}
                                      onPress = { () => this.onClickHandler('login') }/>
                   
                    <TouchableOpacity style   = {styles.socialLoginLink}
                                      onPress = { () => this.onClickHandler('login') }/>

                    <TouchableOpacity style   = {styles.socialLoginLink}
                                      onPress = { () => this.onClickHandler('login') } />
        </View>}*/}
            </View>
        </KeyboardAvoidingView>
        );
    }
}

