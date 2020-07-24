import React, { Component } from 'react';
import { View , Image }     from 'react-native';
import Svg, { Line }        from 'react-native-svg';

import {Constants}          from './Constants';

interface Interface {
    elements: any
}

export default class Node extends Component<Interface> {
    constructor(props: any) {
        super(props);
    }

    render() {
        let nodeList = this.props.elements.map((el: any, idx: any) => {
            if (idx === 0 || idx === this.props.elements.length - 1) {
                return (<View key = {idx}/>);
            }
            else {
                return (
                    <View key = {idx} style = {{
                        width: Constants.PSEUDO_PIXEL * 2 ,
                        height: Constants.PSEUDO_PIXEL * 2,
                        backgroundColor: 'black',
                        position: 'absolute',
                        borderRadius : 100,
                        left: el.x * Constants.PSEUDO_PIXEL + Constants.PSEUDO_PIXEL * 0.5,
                        top: el.y * Constants.PSEUDO_PIXEL + Constants.PSEUDO_PIXEL * 0.5
                    }} />
                );
            }
        });

        let el = this.props.elements;
        
        let threadList = this.props.elements.map((hz: any, idx: any) => {
            if (idx != el.length - 1) {
                let x1 = (el[idx].x * Constants.PSEUDO_PIXEL + Constants.PSEUDO_PIXEL * 1.5).toString();
                let y1 = (el[idx].y * Constants.PSEUDO_PIXEL + Constants.PSEUDO_PIXEL * 1.5).toString();
                let x2= (el[idx+1].x * Constants.PSEUDO_PIXEL + Constants.PSEUDO_PIXEL * 1.5).toString();
                let y2 = (el[idx+1].y * Constants.PSEUDO_PIXEL + Constants.PSEUDO_PIXEL * 1.5).toString();
    
                
                return (
                    <Svg key = {idx} height={Constants.MAX_HEIGHT.toString()} width={Constants.MAX_WIDTH.toString()} style = {{ position : 'absolute'}}>
                        <Line x1={x1} y1 = {y1} x2={x2} y2 = {y2} stroke="black" strokeWidth="5"/>
                    </Svg>
                );
            }
        });

        return (
            <View>
                <Image
                    style={{
                        width: 10*Constants.PSEUDO_PIXEL,
                        height: 5*Constants.PSEUDO_PIXEL,
                        position: 'absolute',
                        left: el[0].x * Constants.PSEUDO_PIXEL - 2*Constants.PSEUDO_PIXEL,
                        top: el[0].y * Constants.PSEUDO_PIXEL + 2*Constants.PSEUDO_PIXEL,
                        transform: [{ rotate: "85deg" }]
                    }}
                    source={require('./Headphone.png')}/>

                {nodeList}
                {threadList}

                <Image
                    style={{
                        width: 10*Constants.PSEUDO_PIXEL,
                        height: 5*Constants.PSEUDO_PIXEL,
                        position: 'absolute',
                        left: el[el.length - 1].x * Constants.PSEUDO_PIXEL - 2*Constants.PSEUDO_PIXEL,
                        top: el[el.length - 1].y * Constants.PSEUDO_PIXEL + 2*Constants.PSEUDO_PIXEL,
                        transform: [{ rotate: "95deg" }]
                    }}
                    source={require('./Headphone.png')}/>
            </View>
        );
    }
}