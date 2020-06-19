import { ImageBackground, Image } from 'react-native';
import React, { Component } from "react";

// View components.
import MenuButton    from '../MenuBottom/MenuBottom';
import HeroStatusBar from '../HeroStatusBar/HeroStatusBar';

export default class GameComponent extends Component {
    constructor(props: any) {
        super(props);
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
