import React          from 'react';
import {View , Image} from 'react-native';

import {Constants}    from '../Constants';


export default function Walls(props: any) {
    let wallList = props.elements.map((el: {x: number, y: number}, idx: number) => {
        return <Image key = {idx} style = {{
            width: Constants.PSEUDO_PIXEL * 10,
            height: Constants.PSEUDO_PIXEL * 10 ,
            position: 'absolute',
            borderRadius : 100,
            left: el.x * Constants.PSEUDO_PIXEL - Constants.PSEUDO_PIXEL * 5,
            top: el.y * Constants.PSEUDO_PIXEL - Constants.PSEUDO_PIXEL * 5,
        }} 
        source={require('./assets/Bush.png')}
        />
    });
       
    return (
        <View>
            {wallList}
        </View>
    );
}
