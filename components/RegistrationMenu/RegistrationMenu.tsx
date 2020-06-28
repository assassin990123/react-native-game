import React, { Component } from "react";
import { Actions } from 'react-native-router-flux';
import { TextInput, Text, View, TouchableOpacity,  Image, Modal} from 'react-native';
import { Auth } from 'aws-amplify';

import { TextInputMask } from 'react-native-masked-text';
import { clickAudioEffect } from '../../endpoints/AudioEffects';

import { styles } from './styles';

/*
*
    @brief: Authentication component.
*
*/


export default class RegistrationMenu extends Component {
    state = {
        phone_number: '',
        username: '',
        password: '',
        email: '',
        smsCode: '',

        modalVisible: false,
        modalText: '',

        smsSent: false,
      }

    constructor(props: any) {
        super(props);
    }

    onClickHandler = (viewId: String) => {
        alert('Button pressed ' + viewId);
    }

    fieldsSuccessful = () : boolean => {
        return this.state.phone_number.length !== 0 && this.state.username.length !== 0 && this.state.password.length !== 0 && this.state.email.length !== 0;
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
          .catch(error=>{console.log('signup error', error); this.openWarningModal('Ошибка соединения или \n некорректно введены данные!');});
    }

    confirmSignUp = async() => {
        await Auth.confirmSignUp(this.state.username, 
                                 this.state.smsCode)
            .then(()=>{console.log('successful confirm singtup'); Actions.CreateCharacter()})
            .catch(error=>{console.log('error confirming signing up',error); this.openWarningModal('Ошибка соединения или \n неправильно введен \n код подтверждения!')});
    }

    openWarningModal = (message: string) => {
        this.state.modalText = message;
        this.setState({modalVisible: true});
    }

    render() {
        return (
        <View style={[styles.content, {alignSelf: 'stretch'}]}>
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
                        <TextInputMask style={styles.input}
                                       placeholder="Номер телефона +7"
                                       type={'custom'}
                                       options={{ mask: '+9 999 999 99 99' }}
                                       value={this.state.phone_number}
                                       onChangeText = { (phoneNumber: string) => {this.setState({phone_number: phoneNumber.replace(/\s/g, '')})} } />
                    </View>

                    <View style = {styles.inputContainer}>
                        <TextInputMask style = {styles.input}
                                       placeholder = "Повторите номер телефона +7"
                                       type={'custom'}
                                       options={{
                                           mask: '+9 999 999 99 99'
                                       }}
                                       value={this.state.username}
                                       onChangeText = { (username: string) => {this.setState({username: username.replace(/\s/g, '')})} } />
                    </View>
        
                    <View style = {styles.inputContainer}>
                        <TextInput style          = {styles.input}
                                   placeholder           = "Пароль"
                                   keyboardType          = "default"
                                   secureTextEntry       = {true}
                                   underlineColorAndroid = 'transparent'
                                   onChangeText = { (password) => this.setState({password: password}) } />
                    </View>

                    <View style = {styles.inputContainer}>
                        <TextInput style                 = {styles.input}
                                   placeholder           = "Email"
                                   keyboardType          = "default"
                                   underlineColorAndroid = 'transparent'
                                   onChangeText = { (email) => this.setState({email: email}) } />
                    </View>
            
                    <TouchableOpacity style   = {styles.sendButton}
                                      onPress = { () => {
                                            clickAudioEffect();

                                            if (!this.fieldsSuccessful()) {
                                                this.openWarningModal('Поля регистрации \n не могут быть пустыми!');
                                                return;
                                            } 
                                            
                                            this.setState({smsSent: true});
                                            this.signUp();
                                          }}>
                        <Text style = {styles.buttonsText}>Отправить код</Text>
                    </TouchableOpacity>

                    <View style = {styles.inputSmsContainer}>
                        <TextInput style                 = {styles.input}
                                   placeholder           = "Код подтверждения из СМС"
                                   keyboardType          = "default"
                                   underlineColorAndroid = 'transparent'

                                   onChangeText = { (smsCode) => this.setState({smsCode: smsCode}) } />
                    </View>

                    <TouchableOpacity style   = {[ styles.continueButton, !this.state.smsSent ? { backgroundColor: 'grey', borderColor: 'grey',} : null]}
                                      onPress = { () => {
                                          clickAudioEffect();

                                          if (!this.state.smsSent) {
                                              return;
                                          }
                                          this.confirmSignUp();
                                      }}>
                        <Text style = {styles.buttonsText}>Подтвердить</Text>
                    </TouchableOpacity>
            </View>
       </View>
         );
    }
}
