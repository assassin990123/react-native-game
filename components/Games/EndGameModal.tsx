import { Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../CharacterMenu/styles";
import { clickAudioEffect } from 'endpoints/AudioEffects';
import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import AsyncStorage from "@react-native-community/async-storage";
import FirestoreAPI from "../../api/FirestoreAPI";


interface Data {
    money: number,
    xp:    number,
    win:   boolean
}

export default class EndGameModal extends Component<Data> {
    state = {
        modalVisible: true
    };

    firestore: FirestoreAPI;

    constructor(props: any) {
        super(props);

        this.firestore = new FirestoreAPI();
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
                                    this.setState({modalVisible: false});
                                    this._addPointsForWinning(this.props.xp, this.props.money)
                                        .then(() => { console.log("[Games] -> add point for winning!") });

                                    clickAudioEffect();
                                    Actions.pop();
                                }}
                            >
                                <Text style={[{color: 'white'}, styles.modalText]}>Спасиба!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
