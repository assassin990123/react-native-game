import React, { Component } from "react";
import { TextInput, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { TextInputMask } from 'react-native-masked-text';

import * as WebBrowser from 'expo-web-browser';

import { clickAudioEffect } from 'endpoints/AudioEffects';

import { styles } from './styles';


/*
*
    @brief: Authentication component.
*
*/

import { Auth } from 'aws-amplify';
import AsyncStorage from "@react-native-community/async-storage";


export default class LogInMenu extends Component {
    state = {
        username: '',
        password: '',
        modalVisible: false,
        modalText: '',
      }
    
    constructor(props: any) {
        super(props);
    }

    fieldsSuccessful() : boolean  {
        return this.state.username.length !== 0 && this.state.password.length !== 0;
    }

    onClickHandler(viewId: String) {
        alert('Button pressed ' + viewId);
    }

    async SingIn() {
        await Auth.signIn(this.state.username, 
                          this.state.password)
            .then(() => {
                console.log("[Auth] -> SingIn Success");

                AsyncStorage.setItem("phoneNumber", this.state.username)
                    .then(() => console.log("[AsyncStorage] -> Username saved in local store."))
                    .catch(() => console.log("[AsyncStorage] -> Cant save user data in local store."));

                Actions.CharacterMenu();
            })
            .catch(error => {
                console.log("[Auth] -> SingIn error", error);
                this.openWarningModal('Не правильно введен \n номер телефона или пароль!');
            });
    }

    openWarningModal(message: string) {
        this.state.modalText = message;
        this.setState({modalVisible: true});
    }

    render() {
        return (
        <View
            style={[styles.content, {alignSelf: 'stretch'}]}
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
                                {this.state.modalText}
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.modalOkButton} onPress={() => { clickAudioEffect(); this.setState({modalVisible: false}) } }>
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
                <TextInputMask style = {styles.input}
                               placeholder = "Номер телефона +7"
                               type={'custom'}
                               options={{
                                   mask: '+9 999 999 99 99'
                                }}
                                       
                                value={this.state.username}
                                onChangeText = { (phoneNumber: string) => {this.setState({username: phoneNumber.replace(/\s/g, '')})} } />
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
                                          clickAudioEffect();
                                          if (!this.fieldsSuccessful()) {
                                            this.openWarningModal('Поля входа \n не могут быть пустыми!');
                                            return;
                                          }
                                        
                                          this.setState({smsSended: true});
                                          this.SingIn();
                                      }}>
                        <Text style = {styles.buttonsText}>Войти</Text>
                    </TouchableOpacity>
                    
                    <Text style = {styles.agitText}>У вас еще нету аккаунта в нашей потрясающей аниме игре?????</Text>

                    <TouchableOpacity style   = {styles.regButton}
                                      onPress = { () => {
                                          clickAudioEffect();
                                          Actions.SignIn();
                                      } }>
                        <Text style = {styles.buttonsText}>Зарегистрироваться</Text>
                    </TouchableOpacity>
                    
                <View style = {styles.donation}>
                    <TouchableOpacity style   = {styles.donatButton}
                                      onPress = { async () => { await WebBrowser.openBrowserAsync('https://patreon.com') } }>
                        <Text style = {styles.donatButtonsText}>Поддержать нас!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        );
    }
}

