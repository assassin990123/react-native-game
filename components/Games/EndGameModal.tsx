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


    _addPointsForWinning(xpValue: number, money: number) {
        this.firestore.getUserFields("+79991774634")
            .then(async data => {
                if (data == undefined) {
                    console.warn("[EndGameModal] -> Cant get user fields from db!");
                    return;
                }

                await AsyncStorage.setItem("xp", (data.xp + xpValue).toString());
                await AsyncStorage.setItem("money", (data.money + money).toString());

                await this.firestore.setUserFields("+79991774634", {money: data.money + money});
                await this.firestore.setUserFields("+79991774634", {xp: data.xp + xpValue});
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
                                    this._addPointsForWinning(this.props.xp, this.props.money);

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
