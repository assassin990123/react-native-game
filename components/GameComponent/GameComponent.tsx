import { Image, ImageBackground, TouchableOpacity, Text, StyleSheet, Dimensions, View, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';
import React, { Component } from 'react';

import BackgroundAudioController from 'endpoints/BackgroundAudioController';
import { clickAudioEffect } from 'endpoints/AudioEffects';
import ButtonGroup from '../ShopAndInventoryGroup/Group';

import Pictures from 'assets/hero_sprites/Pictures';
import AsyncStorage from "@react-native-async-storage/async-storage";

// View components.
import MenuButton    from '../MenuBottom/MenuBottom';
import HeroStatusBar from '../HeroStatusBar/HeroStatusBar';

import { styles } from "../ShopAndInventoryGroup/styles";
import isNetConnected from '../../endpoints/NetConnectionContoller';


const { width, height } = Dimensions.get("screen");

const style = StyleSheet.create({
    button: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: '2%',
        borderRadius: 10,
        width: '90%',
        height: 77,
        backgroundColor: '#EE8AF0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    view: {
        flex: 1,
        zIndex: -1
    },
    image: {
        resizeMode: 'contain',
        height: height * 0.8,
        width: '100%'
    },

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

export default class GameComponent extends Component {
    constructor(props: any) {
        super(props);

        this._backgroundAudio = new BackgroundAudioController();
    }


    state = {
        room: require('../../assets/rooms/BedRoom.png'),
        roomName: 'home',
        spriteName: '',
        netErrorModalVisible: false
    }

    previousState = {
        room: require('../../assets/rooms/BedRoom.png'),
        roomName: 'home',
    }

    _backgroundAudio: BackgroundAudioController;

    async componentDidMount() {
        if (! await isNetConnected()) {
            this.setState({ netErrorModalVisible: true });
            return;
        }

        this._backgroundAudio.setAudioMode();

        this._backgroundAudio.loadNewPlayback(true).then(() => { console.log('[BG Music] -> Music is played!'); });
    }

    // async componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any) {
    //     if (await isNetConnected()) {
    //         this.setState({ netErrorModalVisible: true });
    //         return;
    //     }
    // }

    async componentWillUnmount() {
        await this._backgroundAudio.unloadBackgroundMusic();
    }

    handleSelectedRoom = (selectedRoom: any, name: string) => {
        this.previousState = this.state;
        isNetConnected().then(res => {
            if (! res) {
                this.setState({ netErrorModalVisible: true });
                return;
            }
        });

        this.setState({room: selectedRoom, roomName: name});
        console.log("[GameComponent] -> Current room := " + name);
    }

    mapComponent() {
        return (
            <View style={style.view}>
                <HeroStatusBar handler={(): void => console.log('helloooooooo')} musicController={this._backgroundAudio}/>

                {/* Background image. */}
                <Image source={require('../../assets/rooms/Map.png')} style = {style.image} />

                {/* Points. */}
                <TouchableOpacity style={{position: 'absolute', top: height * 0.3, left: width * 0.2}} onPress={() => {
                    Actions.Tower();
                    clickAudioEffect();
                }}>
                    <Image source={require('./assets/sprites/point.png')} />
                </TouchableOpacity>

                <TouchableOpacity style={{position: 'absolute', top: height * 0.37, left: width * 0.755}} onPress={() => {
                    Actions.Maze();
                    clickAudioEffect();
                }}>
                    <Image source={require('./assets/sprites/point.png')} />
                </TouchableOpacity>

                <TouchableOpacity style={{position: 'absolute', top: height * 0.53, left: width * 0.4}} onPress={() => {
                    Actions.Ducks();
                    clickAudioEffect();
                }}>
                    <Image source={require('./assets/sprites/point.png')} />
                </TouchableOpacity>

                <TouchableOpacity style={{position: 'absolute', top: height * 0.62, left: width * 0.49}} onPress={() => {
                    Actions.Darts();
                    clickAudioEffect();
                }}>
                    <Image source={require('./assets/sprites/point.png')} />
                </TouchableOpacity>

                { /* Back button. */ }
                <TouchableOpacity onPress={() => {
                    clickAudioEffect();
                    this.setState({room: this.previousState.room, roomName: this.previousState.roomName});
                }}
                                  style={style.button}
                                  activeOpacity={1}>
                    <Text style = {{ fontFamily: 'Montserrat-SemiBold', fontSize: 20, color: 'white' }}>Назад</Text>
                </TouchableOpacity>

            </View>
        );
    }

    _interactiveGame(roomName: string): JSX.Element {
        console.log("[GameComponent] -> Current room := " + roomName);
        return roomName !== 'home' ? <View/> :
            (
                <View style={[styles.container, {
                    top: height * 0.82 - (Dimensions.get('screen').height - Dimensions.get('window').height >= 25 ? 45 : 0)
                }]}>
                    <TouchableOpacity
                        onPress={ () => {
                            clickAudioEffect();
                            Actions.Headphones();
                        } }
                        style={styles.button}
                    >
                        <Image source={require('./assets/sprites/headphones.png')} style={[styles.iconImage]}/>
                    </TouchableOpacity>
                </View>
            );
    }

    render() {
        if (this.state.spriteName.length === 0) {
            AsyncStorage.getItem("spriteName").then((key) => {
                console.log("[AsyncStorage] -> Sprite name loaded.")
                this.setState({ spriteName: key });
            }).catch(err => console.error("[AsyncStorage] -> Cant load sprite name!", err));
        }

        return this.state.roomName !== 'dirt' ?
                <ImageBackground source={this.state.room} style = {{flex: 1}}>
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

                    <HeroStatusBar handler={(): void => console.log('')} musicController={this._backgroundAudio}/>
                    <ButtonGroup/>
                    {this._interactiveGame(this.state.roomName)}
                    <Image style={{
                        justifyContent: 'center',
                        marginLeft: 'auto', marginTop: 20
                    }}
                           source={Pictures.get(this.state.spriteName)}
                    />
                    <MenuButton onSelectRoom={this.handleSelectedRoom} />
                </ImageBackground>
            : this.mapComponent();
    }
}
