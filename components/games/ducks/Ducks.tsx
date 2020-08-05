import React, {Component}               from 'react';
import { View, Alert, ImageBackground } from 'react-native';
import { GameEngine }                   from 'react-native-game-engine';

import { Constants }                    from '../Constants';
import { GameLoop }                     from './GameLoop';
import Projectile                       from './Projectile';
import Slingshot                        from './Slingshot';
import Duck                             from './Duck';

export default class Ducks extends Component {
    boardSize: number;
    engine:    any;
    props:     any;

    state = {
       running: true,
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

    render() {
        return (
            <View>
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
                                    points: { score: 0, counting: true }
                                }}

                                onEvent = { this.onEvent }
                                running = { this.state.running }/>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        );
    }
}
