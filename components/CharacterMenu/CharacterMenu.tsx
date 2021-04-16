import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { clickAudioEffect } from 'endpoints/AudioEffects';

import { styles } from './styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import FirestoreAPI from "api/FirestoreAPI";
import isNetConnected from '../../endpoints/NetConnectionContoller';

const DescriptionText: string = '';
// const CharacterName: string ='Name';

export default class CharacterMenu extends Component {
    constructor(props: any) {
        super(props);

        AsyncStorage.getItem("phoneNumber")
                    .then(key => {
                            if (key !== null) {
                                console.log(key);
                                this._db.getUserFields(key).then(res => {
                                    if (res != null)
                                    {
                                        console.log("IM HERE " + res.name);
                                        this.setState({username: res.name});
                                    }
                                })
                            }
                        }
                    );
    }

    state = {
        username: '',
        password: '',
        modalVisible: false,
        netErrorModalVisible: false
    };

    _db: FirestoreAPI = new FirestoreAPI();
    userName = "";

    setModalVisible(visible: Boolean) {
        this.setState({ modalVisible: visible });
    }

    onClickHandler(viewId: String) {
        alert('Button pressed ' + viewId);
    }

    render() {
        console.log("RES = " + this.userName);
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

                <Modal animationType='fade'
                       transparent={true}
                       visible={this.state.modalVisible}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <Text style={[styles.modalTitle, styles.modalPadding]}>Внимание!</Text>

                            <View style={[{justifyContent: 'center', alignItems: 'center'}, styles.modalPadding]}>
                                <Text style={styles.modalText}>Вы собираетесь удалить вашего персонажа!</Text>
                                <Text style={styles.modalText}> Вы действительно хотите это сделать?</Text>
                            </View>
                            
                            <View style={styles.modalButtonGroup}>
                                <TouchableOpacity
                                    style={[{backgroundColor: '#F37052'}, styles.modalButton]}
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                        clickAudioEffect();
                                    }}
                                >
                                    <Text style={[{color: 'white'}, styles.modalText]}>Да</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[{backgroundColor: '#128949'}, styles.modalButton]}
                                    onPress={() => {
                                        clickAudioEffect();
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}
                                >
                                    <Text style={[{color: 'white'}, styles.modalText]}>Нет</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity style   = {styles.backButton}
                                  onPress = { () => {
                                      Actions.LogIn();
                                      clickAudioEffect();
                                  } }>
                        <Image source={require('../../assets/arrow.png')}/>
                </TouchableOpacity>

                {/*<TouchableOpacity style   = {styles.basketButton}*/}
                {/*                    onPress = { () => {this.setModalVisible(!this.state.modalVisible); clickAudioEffect();} }>*/}
                {/*        <Image source={require('../../assets/basket.png')}/>*/}
                {/*</TouchableOpacity>*/}

                <TouchableOpacity onPress = { () => {this.onClickHandler('Header'); clickAudioEffect();} }
                                    style = {styles.headerButton}/>
                <Text style = {styles.logoText}>PEDO</Text> 

                <View style = {styles.nameContaner}>
                    <Text style = {styles.buttonsText}>{this.state.username}</Text>
                </View>  

                <View style = {styles.descriptionContaner}>
                    <Text>{DescriptionText}</Text>
                </View>  

                <TouchableOpacity style = {styles.playButton}
                                    onPress = {async () => {
                                        if (! await isNetConnected()) {
                                            this.setState({ netErrorModalVisible: true });
                                            return;
                                        }

                                        AsyncStorage.getItem("phoneNumber")
                                            .then(key => {
                                                if (key !== null) {
                                                    this._db.getUserFields(key)
                                                        .then(data => {
                                                            // console.log(data);
                                                            if (data !== undefined) {
                                                                AsyncStorage.setItem("spriteName", data.skinName)
                                                                    .then(() => {
                                                                        console.log("[AsyncStorage] -> Sprite name saved");
                                                                    })
                                                                    .catch(() => console.log("[AsyncStorage] -> Cant save sprite"));
                                                                AsyncStorage.getItem("spriteName").then((res) => console.log(res));
                                                            }
                                                        })
                                                        .catch();
                                                }
                                            })
                                            .catch((err: Error) => {
                                                console.error("[AsyncStorage] -> Cant get username!", err);
                                            });

                                        Actions.GameComponent();
                                        clickAudioEffect();
                                    } }>
                    <Text style = {styles.buttonsText}>Играть!</Text>
                </TouchableOpacity>
                    
            </View>
        );
    }
}
