import { Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../CharacterMenu/styles";
import { clickAudioEffect } from "../../endpoints/AudioEffects";
import React, { Component } from "react";
import { Actions } from "react-native-router-flux";


interface Data {
    money: number,
    xp:    number,
    win:   boolean
}

export default class EndGameModal extends Component<Data> {
    constructor(props: any) {
        super(props);
    }

    state = {
        modalVisible: true
    };

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
