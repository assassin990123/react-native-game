import React, { Component } from 'react';
import { View }             from 'react-native';

import { Constants }        from './Constants';

export default class Aim extends Component {
    props: any;

    constructor(props: any) {
        super(props);

        this.props = props;
    }

    render() {
        const x = this.props.position[0];
        const y = this.props.position[1];
 
        return (
            <View>
                <View style = {{ 
                    width:  Constants.DART_SIZE,
                    height: Constants.DART_SIZE,
                    backgroundColor: 'red',
                    position: 'absolute',
                    left: x * Constants.PSEUDO_PIXEL * 0.9 - Constants.DART_SIZE / 2,
                    top:  y * Constants.PSEUDO_PIXEL * 0.9 - Constants.DART_SIZE / 2,
                    borderRadius: 100,
                    zIndex: 3
                }} />
            </View>
        );
    }
}
