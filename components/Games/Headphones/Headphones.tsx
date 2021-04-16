import { View, ImageBackground, Text, TouchableOpacity, Modal } from 'react-native';
import { Actions } from "react-native-router-flux";
import React, { Component } from 'react';

import { GameEngine } from 'react-native-game-engine';
import { Constants } from '../Constants';
import { GameLoop } from './GameLoop';
import Node from './Node';

import { clickAudioEffect } from 'endpoints/AudioEffects';

import { style } from "../ButtonStyle";
import EndGameModal from "../EndGameModal";
import { styles } from '../../CreationCharacterMenu/styles';
import isNetConnected from '../../../endpoints/NetConnectionContoller';


export default class Headphones extends Component {
    engine: any = null;
    state = {
        running: true, entities: {
            node: {
                elements: [], length: 15, filled: false, el: -1, intersect: true,
                // @ts-ignore
                renderer: <Node />
            }, state: { win: false }, update: () => {
                this.setState({ entities: { state: { win: true } } });
            }
        },
        netErrorModalVisible: false
    }

    constructor(props: any) {
        super(props);
    }

    onEvent(e: any) {
        if (e.type === "game-over") {
            console.log("[Headphones game] -> Game Over");
            this.setState({
                running: false, win: true
            })
        }
    }

    randomBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    componentWillUnmount() {
        console.log(`[Headphones game] -> Finish [${this.state.entities.state.win}]`);
    }

    async componentDidMount() {
        if (! await isNetConnected()) {
            this.setState({ netErrorModalVisible: true });
            return;
        }
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
                <EndGameModal xp = {Math.ceil(50 / 10)}
                              money = {Math.ceil(50 / 10)}
                              win = {this.state.entities.state.win} />
            </View>
            <View>
                <ImageBackground source = {require('./assets/Back.png')}
                                 style = {{ width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT }}>
                    <View style = {{
                        justifyContent: "center", width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT
                    }}>
                        <GameEngine
                            ref = {(ref) => {
                                this.engine = ref
                            }}
                            systems = {[GameLoop]}
                            entities = {this.state.entities}
                            onEvent = {this.onEvent}
                            running = {this.state.running}
                        />
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
                                fontFamily: 'Montserrat-SemiBold', fontSize: 20, color: 'white'
                            }}>Назад</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </View>);
    }
}
