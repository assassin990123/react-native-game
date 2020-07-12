import React, {Component} from "react";
import {Image} from "react-native";
import {Constants} from './Constants';



export default class Projectile extends Component{
    constructor(props: any){
        super(props);

        this.props = props;
    }

    props: any;

    render(){

        {/*
        !!!!!!!!!!!
            При сборке проекта ругается на строку с координатами ниже.
            Тянет он это из файла Ducks из игрового движка. В игровом движке из entities, а там из duck: {position: { ... } } .
            Я так понял, что при колбэке объекты теряют контекст и this уже не ссылаются на нашь объект.
            я не знаю как это пофиксить...
        !!!!!!!!!!!
        */}
        const x = this.props.position.x;
        const y = this.props.position.y;
        
        return(
            <Image style = {{ 
                width: Constants.DART_SIZE * 4,
                height: Constants.DART_SIZE * 4,
                position: 'absolute',
                left: x * Constants.PSEUDO_PIXEL -  Constants.PSEUDO_PIXEL * 4,
                top: y * Constants.PSEUDO_PIXEL -  Constants.PSEUDO_PIXEL * 4,
                zIndex: 3,                
            }}
            
            source={require('./assets/Duck.png')}/>
        )

    }
}