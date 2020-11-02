import { ImageBackground, Image } from 'react-native';
import React, { Component } from 'react';

import BackgroundAudioController from '../../endpoints/BackgroundAudioController';

// View components.
import MenuButton    from '../MenuBottom/MenuBottom';
import HeroStatusBar from '../HeroStatusBar/HeroStatusBar';

export default class GameComponent extends Component {
    constructor(props: any) {
        super(props);

        this._backgroundAudio = new BackgroundAudioController();
    }

    state = {
        room: require('../../assets/rooms/BedRoom.png')
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

    handleSelectedRoom = (selectedRoom: any) => {
        this.setState({room: selectedRoom});
    }

    render() {
          return (
                <ImageBackground source={this.state.room} style = {{flex: 1}}>
                        <HeroStatusBar handler={(): void => console.log('helloooooooo')} />
                        <Image style={{left: 20}} source={require('./assets/sprites/AsunaDefault.png')}/>
                        <MenuButton onSelectRoom={this.handleSelectedRoom} />
                </ImageBackground>
        );
    }
}
