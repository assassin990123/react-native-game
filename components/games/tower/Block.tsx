import React, { Component } from 'react';
import { View }             from 'react-native';

import { Constants }        from './Constants';


interface InterfaceTest {
    elements: any[],
    n: number
}

export default class Block extends Component<InterfaceTest> {
    props: any;
    
    constructor(props: any) {
        super(props);
        this.props = props;
    }

    a(index: number) {
        let list = [];

        for (let j = 0; j < this.props.elements[index].length; j++){
            list.push(this.props.elements[index][j]);
        }
        
        let blockList: JSX.Element[] = [];

        blockList = list.map((el, idx) => {
            const red = 255 - (el.width - 8) / 20 * 255;
            const blue = (el.width - 8) / 20 * 255;
            return (
                <View key = {idx + index *this.props.n} style = {{
                    width: el.width * 5,
                    height: Constants.DART_SIZE * 2,
                    position: 'absolute',
                    borderRadius: 10,
                    backgroundColor: `rgb(${red}, 0, ${blue})`,
                    left: el.x * Constants.PSEUDO_PIXEL -  el.width * 2.5,
                    top: el.y * Constants.PSEUDO_PIXEL -  Constants.PSEUDO_PIXEL * 2.5,
                    zIndex: 3,
                }}/>
            );
        }).concat(blockList);

        return blockList;
    }

    render() {
        let blockList: any[] = [];
        
        for(let i = 0; i < 3; i++) {
            blockList.push(this.a(i));
        }

        return(
            <View>
                {blockList}
            </View>
        );
    }
}
