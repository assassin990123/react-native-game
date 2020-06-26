import React, { Component } from "react";
import { TextInput, Text, View, TouchableOpacity, KeyboardAvoidingView, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';

import * as WebBrowser from 'expo-web-browser';

import { styles } from './styles';

/*
*
    @brief: Authentication component.
*
*/

import { Auth } from 'aws-amplify';

export default class StartMenu extends Component {
    state = {
        username: '',
        password: '',
        modalVisible: false
      }
    
    constructor(props: any) {
        super(props);
    }

    fieldsSuccessful = () : boolean => {
        return this.state.username.length !== 0 && this.state.password.length !== 0;
    }

    onClickHandler = (viewId: String) => {
        alert('Button pressed ' + viewId);
    }

    SingIn = async () => {
        // const username:any = this.state.username
        // const password:any = this.state.password
        await Auth.signIn(this.state.username, 
                          this.state.password)
            .then(()=>{console.log('singin Succses'),  Actions.CharacterMenu()})
            .catch(error=>{console.log('signin error', error), alert('Woops, '+ error.message)});
    }

    render() {
        return (
        <KeyboardAvoidingView
            behavior={'padding'}
            style={styles.content}
          >
             <Modal animationType='fade'
                       transparent={true}
                       visible={this.state.modalVisible}
                       onRequestClose={() => {this.setState({modalVisible: false})}}>
                    <View style={styles.modalContainer}>
                        <View style={[styles.modalView]}>
                            <Text style={[styles.modalTitle]}>Ошибка!</Text>
                            <View style={{justifyContent: "center", alignItems: 'center'}}>
                                <Text style={styles.modalErrorText}>
                                    Поля входа {"\n"} не могут быть пустыми!
                                </Text>
                            </View>
                            
                            <TouchableOpacity style={styles.modalOkButton} onPress={() => { this.setState({modalVisible: false}) } }>
                                <Text style={styles.modalOkButtonText}>Понятно</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            <View style = {styles.content}>
                           
                <View style = {styles.header}> 
                    <TouchableOpacity onPress = { () => {this.onClickHandler('Header')} } 
                                      style = {styles.headerButton}/>
                    <Text style = {styles.logoText}>PEDO</Text> 
                </View>


                    <View style = {styles.inputContainer}>
                        <TextInput style          = {styles.input}
                                   placeholder           = "Номер телефона +7"
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
                                      onPress = { () => {  
                                        if (!this.fieldsSuccessful()) {
                                            this.setState({modalVisible: true});
                                            return;
                                        } 
                                        
                                        this.setState({smsSended: true});
                                        this.SingIn();
                                      }}>
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

