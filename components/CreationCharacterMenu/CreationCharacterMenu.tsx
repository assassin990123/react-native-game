import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { clickAudioEffect } from 'endpoints/AudioEffects';

import { styles } from './styles';
import isNetConnected from '../../endpoints/NetConnectionContoller';

const DescriptionText: string = 'some text';
const CharacterName: string ='Name';

export default class CreationCharacterMenu extends Component {
    constructor(props: any) {
        super(props);
    }

    state = {
        username: "",
        password: "",
        netErrorModalVisible: false
    }

    onClickHandler(viewId: String) {
        alert('Button pressed ' + viewId);
    }

    render() {
        return (
            <View style = {styles.content}>
                <Modal animationType = 'fade'
                       transparent = {true}
                       visible = {this.state.netErrorModalVisible}
                       onRequestClose = {() => {
                           this.setState({ netErrorModalVisible: false });
                           Actions.LogIn();
                       }}>
                    <TouchableOpacity style = {styles.modalContainer_net} activeOpacity = {1} onPress = {() => {
                        this.setState({ netErrorModalVisible: false });
                        Actions.LogIn();
                    }}>
                        <TouchableOpacity style = {[styles.modalView_Net]} activeOpacity = {1}>
                            <Text style = {[styles.modalTitle_Net]}>Отсутсвует подключение к сети!</Text>

                            <TouchableOpacity style={styles.modalOkButton} onPress={() => { clickAudioEffect(); this.setState({netErrorModalVisible: false}); Actions.LogIn(); } }>
                                <Text style={styles.modalOkButtonText}>Понятно</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>

                <TouchableOpacity style   = {styles.backButton}
                                    onPress = { () => {
                                        Actions.LogIn();
                                        clickAudioEffect();
                                    } }>
                        <Image source={require("../../assets/arrow.png")}/>
                </TouchableOpacity>

                {/*<TouchableOpacity style   = {styles.refreshButton}*/}
                {/*                    onPress = { () => {} }>*/}
                {/*        <Image source={require("../../assets/refresh.png")}/>*/}
                {/*</TouchableOpacity>*/}

                <TouchableOpacity onPress = { () => {this.onClickHandler('Header'); clickAudioEffect();} }
                                    style = {styles.headerButton}/>
                <Text style = {styles.logoText}>PEDO</Text> 

                <View style = {styles.nameContaner}>
                    <Text style = {styles.buttonsText}>{CharacterName}</Text>
                </View>  

                <View style = {styles.descriptionContaner}>
                    <Text>{DescriptionText}</Text>
                </View>  
                

                <TouchableOpacity style   = {styles.playButton}
                                  onPress = { async () => {
                                      if (! await isNetConnected()) {
                                          this.setState({ netErrorModalVisible: true });
                                          return;
                                      }

                                      Actions.GameComponent(); clickAudioEffect();
                                  } }>
                    <Text style = {styles.buttonsText}>Играть!</Text>
                </TouchableOpacity>
                    
            </View>
        );
    }
}
