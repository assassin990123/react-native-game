import { View, Alert, ImageBackground, Text, TouchableOpacity } from 'react-native';
import React, {Component}                                       from 'react';
import { Actions }                                              from "react-native-router-flux";

import { GameEngine }                   from 'react-native-game-engine';
import { Constants }                    from '../Constants';
import { GameLoop }                     from './GameLoop';
import Projectile                       from './Projectile';
import Slingshot                        from './Slingshot';
import Duck                             from './Duck';

import { clickAudioEffect } from 'endpoints/AudioEffects';

import { style } from "../ButtonStyle";
import EndGameModal from "../EndGameModal";


export default class Ducks extends Component {
    boardSize: number;
    engine:    any;
    props:     any;

    state = {
        running: true,
        win: false,
        scorePoints: 0,
        update: (points: number) => { this.setState({...this.state, win: true, scorePoints: points}); }
    }

    constructor(props: any) {
        super(props);

        this.props = props;
        this.boardSize = Constants.MIN_SIDE;
        this.engine = null;
    }

    onEvent(e: any) {
        if (e.type === "game-over"){
            Alert.alert("Game Over");
            this.setState({
               running: false
            })
        }
    }

    randomBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    componentWillUnmount() {
        console.log(`[Ducks game] -> Score := ${this.state.scorePoints}`);
        console.log(`[Ducks game] -> Finish [${this.state.win}]`);
    }

    render() {
        return (
            <View>
                <View>
                    <EndGameModal money={0} xp={this.state.scorePoints} win={this.state.win} />
                </View>
                <View>
                    <ImageBackground source={require('./assets/Back.png')} style={{width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT}}>
                        <View style = {{justifyContent: "center", width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT}}>
                            <GameEngine
                                ref = {(ref) => {this.engine = ref}}
                                systems = {[ GameLoop ]}
                                entities = {{
                                    slingshot: {
                                        position: { x: 25, y: 75 },
                                        renderer:  <Slingshot/>
                                    },
                                    projectile: {
                                        position: { x: 25, y: 75 },
                                        speed:    { x: 0,  y: 0  },
                                        startPos: { x: 0,  y: 0  },
                                        endPos:   { x: 0,  y: 0  },
                                        deg: 0,
                                        launch: false,
                                        hited:  false,
                                        missed: false,
                                        amount: 3,
                                        renderer: <Projectile/>},
                                    duck: {
                                        position: {
                                            x: this.randomBetween(8, Constants.GRID_SIZE - 9),
                                            y: this.randomBetween(8, Constants.GRID_SIZE - 9)
                                        },
                                        speed: {
                                            x: 0.3,
                                            y: 0.15
                                        },
                                        startPos: {
                                            x:      0,
                                            y:      0,
                                            filled: false
                                        },
                                        dir: {
                                            x: true,
                                            y: true
                                        },
                                        renderer:  <Duck/>
                                    },
                                    points: { score: 0, counting: true },
                                    state: this.state
                                }}

                                onEvent = { this.onEvent }
                                running = { this.state.running }/>
                            <TouchableOpacity onPress={() => {
                                Actions.pop();
                                clickAudioEffect();
                            }}
                                              style={style.button}
                                              activeOpacity={1}>
                                <Text style = {{ fontFamily: 'Montserrat-SemiBold', fontSize: 20, color: 'white' }}>Назад</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        );
    }
}
