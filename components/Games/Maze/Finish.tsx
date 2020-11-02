import React         from 'react';
import { Image }     from 'react-native';

import { Constants } from '../Constants';


export default function Finish(props: any): JSX.Element {
    return(
        <Image style = {{
            width: Constants.PSEUDO_PIXEL * 5 ,
            height: Constants.PSEUDO_PIXEL * 5,
            position: 'absolute',
            left: props.position.x * Constants.PSEUDO_PIXEL - Constants.PSEUDO_PIXEL * 2.5,
            top: props.position.y * Constants.PSEUDO_PIXEL - Constants.PSEUDO_PIXEL * 2.5
        }} 
        source={require('./assets/Flag.png')}/>
    );
}
