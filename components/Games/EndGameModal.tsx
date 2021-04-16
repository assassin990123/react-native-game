import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { styles } from "../CharacterMenu/styles";
import { clickAudioEffect } from 'endpoints/AudioEffects';
import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FirestoreAPI from "../../api/FirestoreAPI";
import isNetConnected from '../../endpoints/NetConnectionContoller';


const style = StyleSheet.create({
    modalContainer_net: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        width: '100%',
        height: '100%'
    },

    modalOkButton: {
        backgroundColor: 'white',
        width: '85%',
        height: '20%',
        justifyContent: 'center',
        alignItems:'center',
        borderColor:'#F37052',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },

    modalTitle_Net: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 30,
        marginBottom: 15,
        textAlign: 'center'
    },

    modalOkButtonText: {
        color: '#F37052',
        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
        textAlign: 'center'
    },

    modalView_Net: {
        borderRadius: 10,
        backgroundColor: 'white',
        width: '80%',
        height: '35%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


interface Data {
    money: number,
    xp:    number,
    win:   boolean
}

export default class EndGameModal extends Component<Data> {
    state = {
        modalVisible: true,
        netErrorModalVisible: false
    };

    firestore: FirestoreAPI;

    constructor(props: any) {
        super(props);

        this.firestore = new FirestoreAPI();
    }

    async componentDidMount() {
        if (! await isNetConnected()) {
            this.setState({ netErrorModalVisible: true });
            return;
        }
    }

    async _addPointsForWinning(xpValue: number, money: number) {
        const phoneNumber = await AsyncStorage.getItem('phoneNumber');
        if (phoneNumber == null){
            return;
        }

        this.firestore.getUserFields(phoneNumber)
            .then(async data => {
                if (data == undefined) {
                    console.warn("[EndGameModal] -> Cant get user fields from db!");
                    return;
                }

                await AsyncStorage.setItem("xp", (data.xp + xpValue).toString());
                await AsyncStorage.setItem("money", (data.money + money).toString());

                await this.firestore.setUserFields(phoneNumber, {money: data.money + money});
                await this.firestore.setUserFields(phoneNumber, {xp: data.xp + xpValue});

                AsyncStorage.getItem("moodPoints")
                    .then((moodPoints) => {
                        console.log("mood Point now grow -> " + moodPoints);

                        if (moodPoints != null && +moodPoints < 100) {
                            let _additionalVal: number = (100 - +moodPoints < 10) ? (100 - +moodPoints) : 10;

                            AsyncStorage.setItem("moodPoints", String(+moodPoints + _additionalVal));
                            this.firestore.setUserFields(phoneNumber, { moodPoints: +moodPoints + _additionalVal });
                        }
                    });
            });
    }

    render() {
        return (
            <View>
            <Modal animationType = 'fade'
                   transparent = {true}
                   visible = {this.state.netErrorModalVisible}
                   onRequestClose = {() => {
                       this.setState({ netErrorModalVisible: false });
                       Actions.LogIn();
                   }}>
                <TouchableOpacity style = {style.modalContainer_net} activeOpacity = {1} onPress = {() => {
                    this.setState({ netErrorModalVisible: false });
                    Actions.LogIn();
                }}>
                    <TouchableOpacity style = {[style.modalView_Net]} activeOpacity = {1}>
                        <Text style = {[style.modalTitle_Net]}>Отсутсвует подключение к сети!</Text>

                        <TouchableOpacity style={style.modalOkButton} onPress={() => { clickAudioEffect(); this.setState({netErrorModalVisible: false}); Actions.LogIn(); } }>
                            <Text style={style.modalOkButtonText}>Понятно</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>

            <Modal animationType='fade'
                   transparent={true}
                   visible={this.props.win && this.state.modalVisible}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalView, {height: "30%"}]}>
                        <Text style={[styles.modalTitle, styles.modalPadding]}>Внимание!</Text>

                        <View style={[{justifyContent: 'center', alignItems: 'center'}, styles.modalPadding]}>
                            <Text style={styles.modalText}>Вы выйграли!</Text>
                            <Text style={styles.modalText}>Ваша добыча: {this.props.xp} XP и {this.props.money} P</Text>
                        </View>

                        <View style={[styles.modalButtonGroup, {height: '20%'}]}>
                            <TouchableOpacity
                                style={[{backgroundColor: '#128949'}, styles.modalButton]}
                                onPress={() => {
                                    isNetConnected().then(res => {
                                        if (! res) {
                                            this.setState({ netErrorModalVisible: true });
                                            return;
                                        } else {
                                            this.setState({modalVisible: false});
                                            this._addPointsForWinning(this.props.xp, this.props.money)
                                                .then(() => { console.log("[Games] -> add point for winning!") });

                                            clickAudioEffect();
                                            Actions.pop();
                                        }
                                    });
                                }}
                            >
                                <Text style={[{color: 'white'}, styles.modalText]}>Спасиба!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            </View>
        );
    }
}
