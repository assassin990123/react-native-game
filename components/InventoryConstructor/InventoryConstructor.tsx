import React, { Component } from "react";
import { View, FlatList, Text, ImageBackground, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { clickAudioEffect } from "../../endpoints/AudioEffects";

import { styles } from './styles';

const { height } = Dimensions.get('screen');

interface ShopItem {
    title: string,
    desc:  string,
    buffs: number,
    debuf: number, 
    price: number
}

export type ButtonProps = {
    text?: string,
    handler?: () => void;
};

export interface IInventoryProps {
    topElemProps?: ButtonProps,
    bottomElemProps: ButtonProps,
    data: ShopItem[]
}

export class InventoryConstructor extends Component<IInventoryProps> {
    constructor(props: any) {
        super(props);

        this._topButtonData   = props.topElemProps;
        this._bottomButtonData = props.bottomElemProps;
        this.data = props.data;
    }

    state = {
        clothesSection: {pressed: true,  name: 'clothes'},
        cleanSection:   {pressed: false, name: 'clean'},
        eatSection:     {pressed: false, name: 'eat'},
        funSection:     {pressed: false, name: 'fun'},

        currPressed: 'clothes'
    }

    setSection (propName: string): void {
        clickAudioEffect();

        if (propName === this.state.currPressed) {
            return;
        }

        for (let [, value] of Object.entries(this.state)) {
            if (typeof(value) === 'string') {
                continue;
            }

            value.pressed = false;

            if (value.name === propName) {
                this.state.currPressed = propName;
                this.setState({key: {pressed: true, name: propName}});
                value.pressed = true;
            }
        }
    }

    data: ShopItem[];

    _topButtonData:    ButtonProps;
    _bottomButtonData: ButtonProps;

    _renderTopElement(text: string): JSX.Element {
        if (this._topButtonData === undefined) {
            return (
                <View style={{height: '60%', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.priceText}>{`${text}P`}</Text>
                </View>
            );
        }

        return (
            <TouchableOpacity style={{backgroundColor: '#E3463C', width: '100%', marginBottom: '21%', height: '40%', alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: 10, borderTopRightRadius: 10}}
                            onPress={() => {
                                if (this._topButtonData.handler !== undefined){
                                    this._topButtonData.handler();
                                }

                                clickAudioEffect();
                            }}>
                <Text style={[styles.priceText, {fontSize: 16}]}>{this._topButtonData.text}</Text>
            </TouchableOpacity>
        );
    }

    _renderBottomElement(): JSX.Element {
        return (
            <TouchableOpacity style={{backgroundColor: 'yellow', width: '100%', height: '40%', alignItems: 'center', justifyContent: 'center', borderBottomRightRadius: 10, borderTopLeftRadius: 10}}
                            onPress={() => {
                                if (this._bottomButtonData.handler !== undefined){
                                    this._bottomButtonData.handler();
                                }

                                clickAudioEffect();
                            }}>
                <Text style={[styles.priceText, {fontSize: 16}]}>{this._bottomButtonData.text}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <ImageBackground source={require('./assets/background.png')} style={styles.container}> 
                <View style={[styles.selector, Dimensions.get('screen').height - Dimensions.get('window').height > 25 ? styles.notchPadding : null]}>
                    <TouchableOpacity style={this.state.clothesSection.pressed ? [styles.pressedSection, {flexDirection: 'row'}] : styles.defaultSection} onPress={() => { this.setSection('clothes');}}>
                        <Image source={require('./assets/clothes_icon.png')}/>
                        <Text style={[{fontFamily: 'Montserrat-Regular', fontSize: 20, paddingLeft: 30}, this.state.clothesSection.pressed ? null : {display: 'none'}]}>Одежда</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={this.state.cleanSection.pressed ?  [styles.pressedSection, {flexDirection: 'row'}] : styles.defaultSection} onPress={() => { this.setSection('clean'); }}>
                        <Image source={require('./assets/clean_icon.png')}/>
                        <Text style={[{fontFamily: 'Montserrat-Regular', fontSize: 20, paddingLeft: 30}, this.state.cleanSection.pressed ? null : {display: 'none'}]}>Чистота</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={this.state.eatSection.pressed ?  [styles.pressedSection, {flexDirection: 'row'}] : styles.defaultSection} onPress={() => { this.setSection('eat'); }}>
                        <Image source={require('./assets/eat_icon.png')}/>
                        <Text style={[{fontFamily: 'Montserrat-Regular', fontSize: 20, paddingLeft: 30}, this.state.eatSection.pressed ? null : {display: 'none'}]}>Еда</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={this.state.funSection.pressed ?  [styles.pressedSection, {flexDirection: 'row'}] : styles.defaultSection} onPress={() => { this.setSection('fun'); }}>
                        <Image source={require('./assets/fun_icon.png')}/>
                        <Text style={[{fontFamily: 'Montserrat-Regular', fontSize: 20, paddingLeft: 30}, this.state.funSection.pressed ? null : {display: 'none'}]}>Разлечения</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{height: '75%'}}>
                    <FlatList
                        data={this.data}
                        contentContainerStyle={styles.listView}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => <View style={{flexDirection: 'row', width: '95%', height: height * 0.13, marginTop: 15, backgroundColor: '#F57CFF', borderRadius: 10}}> 
                                    <View style={{width: '20%', alignItems: 'center', justifyContent: 'center'}}>
                                        <Image source={require('./assets/balloon.png')}/>
                                    </View>
                                    <View style={{width: '50%', justifyContent: 'center'}}> 
                                        <Text style={styles.titleText}>{item.title}</Text>
                                        <Text style={styles.descriprionText}>{item.desc}</Text>
                                        <Text style={styles.effectsText}>{`-${item.debuf} чистота +${item.buffs} настроение`}</Text>
                                    </View>
                                    <View style={{width: '30%'}}>
                                        { this._renderTopElement(item.price.toString())    }
                                        { this._renderBottomElement() }
                                    </View>
                            </View>
                        }/>
                    </View>

                    <View style={{width: '100%', height: '15%', justifyContent: 'center', alignContent: 'center'}}>
                        <TouchableOpacity  onPress={() => { Actions.GameComponent(); clickAudioEffect(); }}
                                            style={styles.backButton}> 
                                <Text style={{color: 'white', fontFamily: 'Montserrat-Medium', fontSize: 17}}>Назад</Text>
                        </TouchableOpacity>
                    </View>
                    
            </ImageBackground>
        );
    }
}
