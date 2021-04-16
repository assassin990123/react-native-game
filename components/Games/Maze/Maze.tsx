import { View, ImageBackground, Text, TouchableOpacity, Modal } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { Actions } from "react-native-router-flux";
import React, { Component } from 'react';

import { Constants } from '../Constants';
import { GameLoop } from './GameLoop';
import Finish from './Finish';
import Walls from './Walls';
import Hero from './Hero';

import { clickAudioEffect } from 'endpoints/AudioEffects';

import { style } from "../ButtonStyle";
import EndGameModal from "../EndGameModal";
import isNetConnected from '../../../endpoints/NetConnectionContoller';
import { styles } from '../../CreationCharacterMenu/styles';


interface IMazeGame {
    position: {
        x: number, y: number
    }
}

export default class Maze extends Component<IMazeGame> {
    engine: any = null;
    state = {
        running: true, win: false, scorePoints: 0, update: (points: number) => {
            this.setState({ ...this.state, win: true, scorePoints: points });
        },
        netErrorModalVisible: false
    };

    props: any;

    constructor(props: any) {
        super(props);

        this.props = props;
    }

    onEvent(e: any) {
        if (e.type === "game-over") {
            alert("Game Over");
            this.setState({
                running: false
            });
        }
    }

    randomBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    async componentDidMount() {
        if (! await isNetConnected()) {
            this.setState({ netErrorModalVisible: true });
            return;
        }
    }

    componentWillUnmount() {
        console.log(`[Maze game] -> Score := ${this.state.scorePoints}`);
        console.log(`[Maze game] -> Finish [${this.state.win}]`);
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
                    <EndGameModal money = {Math.ceil(8 * this.state.scorePoints / 10)} xp = {Math.ceil(8 * this.state.scorePoints / 10)} win = {this.state.win} />
                </View>
                <ImageBackground source = {require('./assets/Back.png')}
                                 style = {{ width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT }}>
                    <View style = {{
                        justifyContent: "center",
                        width: Constants.MAX_WIDTH,
                        height: Constants.MAX_HEIGHT
                    }}>
                        <GameEngine
                            ref = {(ref) => {
                                this.engine = ref
                            }}
                            systems = {[GameLoop]}
                            entities = {{
                                hero: {
                                    position: { x: 13, y: 76 }, startPos: { x: 13, y: 76 }, renderer: <Hero />
                                }, wall: {
                                    elements: [],
                                    length: 43,
                                    filled: false,
                                    el: -1,
                                    intersect: true,
                                    renderer: <Walls />
                                }, finish: {
                                    position: { x: 41, y: 83 }, renderer: <Finish />
                                }, state: this.state
                            }}
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
                                fontFamily: 'Montserrat-SemiBold',
                                fontSize: 20,
                                color: 'white'
                            }}>Назад</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>);
    }
} 
