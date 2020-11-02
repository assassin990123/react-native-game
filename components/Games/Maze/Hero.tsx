import React         from 'react';
import { View }      from 'react-native';

import { Constants } from '../Constants';


export default function Hero(props: any) {
    return(
        <View style = {{
            width: Constants.PSEUDO_PIXEL * 2 ,
            height: Constants.PSEUDO_PIXEL * 2,
            backgroundColor: 'red',
            position: 'absolute',
            borderRadius : 100,
            left: props.position.x * Constants.PSEUDO_PIXEL - Constants.PSEUDO_PIXEL,
            top: props.position.y * Constants.PSEUDO_PIXEL - Constants.PSEUDO_PIXEL
        }} />
    );
}
