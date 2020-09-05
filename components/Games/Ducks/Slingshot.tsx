import React, {Component } from 'react';
import { Image }           from 'react-native';

import { Constants }       from '../Constants';

interface Interface {
    position: {
        x: number,
        y: number
    },

    deg: number
}

export default class Slingshot extends Component<Interface> {
    props: any;

    constructor(props: any) {
        super(props);

        this.props = props;
    }

    render() {
        const x = this.props.position.x;
        const y = this.props.position.y;

        return (
            <Image style = {{
                width: Constants.SLINGSHOT_SIDE.x,
                height: Constants.SLINGSHOT_SIDE.y,
                position: 'absolute',
                left: x * Constants.PSEUDO_PIXEL - Constants.SLINGSHOT_SIDE.x/2,
                top: y * Constants.PSEUDO_PIXEL - Constants.SLINGSHOT_SIDE.y/8,

                }}
                source={require('./assets/Slingshot.png')} />
        );
    }
}