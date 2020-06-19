import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { styles } from './styles';

const DescriptionText: string = 'some text';
const CharacterName: string ='Name';

export default class StartMenu extends Component {
    constructor(props: any) {
        super(props);
        
        this.state = {
          username: String,
          password: String,
        }
    }

    onClickHandler = (viewId: String) => {
        alert('Button pressed ' + viewId);
    }

    render() {
        return (
            <View style = {styles.content}>

                <TouchableOpacity style   = {styles.backButton}
                                    onPress = { () => Actions.LogIn() }>
                        <Image source={require("../../assets/arrow.png")}/>
                </TouchableOpacity>

                <TouchableOpacity style   = {styles.basketButton}
                                    onPress = { () => {} }>
                        <Image source={require("../../assets/basket.png")}/>
                </TouchableOpacity>
 
                <TouchableOpacity onPress = { () => {this.onClickHandler('Header')} } 
                                    style = {styles.headerButton}/>
                <Text style = {styles.logoText}>PEDO</Text> 

                <View style = {styles.nameContaner}>
                    <Text style = {styles.buttonsText}>{CharacterName}</Text>
                </View>  

                <View style = {styles.descriptionContaner}>
                    <Text>{DescriptionText}</Text>
                </View>  
                

                <TouchableOpacity style   = {styles.playButton}
                                    onPress = { () => { Actions.GameComponent(); } }>
                    <Text style = {styles.buttonsText}>Играть!</Text>
                </TouchableOpacity>
                    
            </View>
        );
    }
}