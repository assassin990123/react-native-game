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

    render() {
          return (
                <ImageBackground source={require('./assets/backgrounds/BedRoom.png')} style = {{flex: 1}}> 
                        <HeroStatusBar handler={(): void => console.log('helloooooooo')} />
                        <Image source={require('./assets/sprites/AsunaDefault.png')}/>
                        <MenuButton/>
                </ImageBackground>
        );
    }
}
