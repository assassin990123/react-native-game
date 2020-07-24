import React, { Component } from 'react';
import { View }             from 'react-native';

import { Constants }        from './Constants';


interface Interface {
    elements: any[],
    n: number
}

export default class Block extends Component<Interface> {
    constructor(props: any) {
        super(props);
    }

    a() {
        let blockList: any[] = [];
        let i: number = 0;

        let list = [];

        for (let j = 0; j < this.props.elements[i].length; j++){
            list.push(this.props.elements[i][j]);
        }

        blockList = list.map((el, idx) => {
            return (
                <View key = {idx + i*this.props.n} style = {{
                    width: el.width * 5,
                    height: Constants.DART_SIZE * 2,
                    position: 'absolute',
                    borderRadius: 10,
                    backgroundColor: 'rgb(' + (255 - (el.width - 8) / 20 * 255).toString() +',0,' + ((el.width - 8) / 20 * 255).toString() + ')',
                    left: el.x * Constants.PSEUDO_PIXEL -  el.width * 2.5,
                    top: el.y * Constants.PSEUDO_PIXEL -  Constants.PSEUDO_PIXEL * 2.5,
                    zIndex: 3,
                }}/>
            );
        }).concat(blockList);

        i++;

        return blockList;
    }

    render() {
        let blockList: any[] = [];

        blockList.push(this.a());
        blockList.push(this.a());
        blockList.push(this.a());

        return(
            <View>
                {blockList}
            </View>
        );
    }
}