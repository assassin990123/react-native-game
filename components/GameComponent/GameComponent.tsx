import { ImageBackground, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React, { Component } from 'react';

import BackgroundAudioController from '../../endpoints/BackgroundAudioController';
import ButtonGroup from '../ShopAndInventoryGroup/Group';

// View components.
import MenuButton    from '../MenuBottom/MenuBottom';
import HeroStatusBar from '../HeroStatusBar/HeroStatusBar';


const buttonStyle = StyleSheet.create({
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
    }
});

export default class GameComponent extends Component {
    constructor(props: any) {
        super(props);

        this._backgroundAudio = new BackgroundAudioController();
    }

    state = {
        room: require('../../assets/rooms/BedRoom.png'),
        roomName: ''
    }

    previousState = {
        room: require('../../assets/rooms/BedRoom.png'),
        roomName: ''
    }

    _backgroundAudio: BackgroundAudioController;

    componentDidMount() {
        this._backgroundAudio.setAudioMode();

        this._backgroundAudio.loadNewPlayback(true)
            .then(() => {
                console.log('Music is played!');
            });
    }

    componentWillUnmount() {
        this._backgroundAudio.unloadBackgroundMusic();
    }

    handleSelectedRoom = (selectedRoom: any, name: string) => {
        this.previousState = this.state;

        this.setState({room: selectedRoom, roomName: name});
        console.log(name);
    }

    mapComponent() {
        return (
            <ImageBackground source={this.state.room} style = {{flex: 1}}>
                <HeroStatusBar handler={(): void => console.log('helloooooooo')} />
                <TouchableOpacity onPress={() => {
                    this.setState({room: this.previousState.room, roomName: this.previousState.roomName});
                }}
                                  style={buttonStyle.button}
                                  activeOpacity={1}>
                    <Text style = {{ fontFamily: 'Montserrat-SemiBold', fontSize: 20, color: 'white' }}>Назад</Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }

    render() {
        return this.state.roomName !== 'dirt' ?
                <ImageBackground source={this.state.room} style = {{flex: 1}}>
                    <HeroStatusBar handler={(): void => console.log('helloooooooo')} />
                    <ButtonGroup/>
                    <Image style={{justifyContent: 'center', marginLeft: 'auto'}} source={require('./assets/sprites/AsunaDefault.png')}/>
                    <MenuButton onSelectRoom={this.handleSelectedRoom} />
                </ImageBackground>
            : this.mapComponent();
    }
}
