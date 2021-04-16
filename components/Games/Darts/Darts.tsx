import React, { Component } from 'react';
import { Actions } from "react-native-router-flux";
import { View, TouchableOpacity, ImageBackground, Text, Modal } from 'react-native';
import { GameEngine } from 'react-native-game-engine';

import Aim from './Aim';
import Dart from './Dart';
import { GameLoop } from './GameLoop';
import { Constants } from '../Constants';

import { clickAudioEffect } from 'endpoints/AudioEffects';

import { style } from "../ButtonStyle";
import EndGameModal from "../EndGameModal";
import { styles } from '../../CreationCharacterMenu/styles';
import isNetConnected from '../../../endpoints/NetConnectionContoller';


export default class Darts extends Component {
    engine: any = null;

    state = {
        running: true, win: false, scorePoints: 0, update: (points: number) => {
            this.setState({ ...this.state, win: true, scorePoints: points });
        },
        netErrorModalVisible: false
    }

    constructor(props: any) {
        super(props);
    }

    onEvent(e: any) {
        if (e.type === "game-over") {
            alert("Game Over");
            this.setState({
                running: false, win: true
            });
        }
    }

    randomBetween(min: any, max: any) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    async componentDidMount() {
        if (! await isNetConnected()) {
            this.setState({ netErrorModalVisible: true });
            return;
        }
    }

    componentWillUnmount() {
        console.log(`[Dart game] -> Score := ${this.state.scorePoints}`);
        console.log(`[Dart game] -> Finish [${this.state.win}]`);
    }

    render() {
        return (<View>
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

                <View>
                    <EndGameModal money = {Math.ceil(10 * this.state.scorePoints / 14)} xp = {Math.ceil(10 * this.state.scorePoints / 14)} win = {this.state.win} />
                </View>
                <View>
                    <TouchableOpacity onPress = {() => {
                        this.engine.dispatch({ type: 'next-state' })
                    }} activeOpacity = {1}>
                        <ImageBackground source = {require('./assets/Back.png')}
                                         style = {{ width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT }}>
                            <View style = {{ justifyContent: "center" }}>
                                <ImageBackground source = {require('./assets/Board.png')} style = {{
                                    flexDirection: 'column',
                                    width: Constants.MIN_SIDE * 0.9,
                                    height: Constants.MIN_SIDE * 0.9,
                                    left: Constants.MIN_SIDE * 0.05,
                                    top: Constants.MAX_HEIGHT * 0.2
                                }}>
                                    <GameEngine
                                        ref = {(ref) => {
                                            this.engine = ref
                                        }}
                                        systems = {[GameLoop]}
                                        entities = {{
                                            aim: {
                                                position: [25, 25],
                                                speed: 1,
                                                xDirection: true,
                                                yDirection: true,
                                                state: 0,
                                                size: Constants.DART_SIZE,
                                                renderState: false,
                                                renderer: <Aim />
                                            }, points: {
                                                score: 0, counting: true
                                            }, dart: {
                                                elements: [], renderer: <Dart />
                                            }, state: this.state
                                        }}

                                        onEvent = {this.onEvent}
                                        running = {this.state.running}
                                    />
                                </ImageBackground>
                            </View>
                            <TouchableOpacity onPress = {() => {
                                isNetConnected().then(res => {
                                    if (! res) {
                                        this.setState({ netErrorModalVisible: true });
                                        return;
                                    } else {
                                        clickAudioEffect();
                                        Actions.pop();
                                    }
                                 });
                            }}
                                              style = {style.button}
                                              activeOpacity = {1}>
                                <Text style = {{
                                    fontFamily: 'Montserrat-SemiBold',
                                    fontSize: 20,
                                    color: 'white'
                                }}>Назад</Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>);
    }
}
