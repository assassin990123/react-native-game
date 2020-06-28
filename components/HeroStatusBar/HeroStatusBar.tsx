import React, { Component } from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet, Dimensions, Modal, BackHandler  } from 'react-native';

import { clickAudioEffect } from '../../endpoints/AudioEffects';

import {styles} from './styles';

/*
*
    @brief: Status bar to display characters needs, such as sleep, food, lvl and etc.
*
*/

interface IHeroStatusBar {
    handler: Function,
}

export default class HeroStatusBar extends Component<IHeroStatusBar> {
    constructor (props: any) {
        super(props);
        props.handler();
    }

    state = {
        _icons: {
            satietly:  { link: require('./assets/satiety.png'),   currentState: 100,  name: 'Голод' },
            sleep:     { link: require('./assets/sleep.png'),     currentState: 100,  name: 'Бодрость' },
            cleanness: { link: require('./assets/cleanness.png'), currentState: 100,  name: 'Чистота' },
            mood:      { link: require('./assets/mood.png'),      currentState: 100,  name: 'Настроение' },
        },
        
        _money: { link: require('./assets/money.png'), currentState: 0,  name: 'Монетки' },

        settingsModalVisible: false,
        statsModalVisible:    false,

        level: {number: 1, exp: 1000}
    };

    getCurrentColor = (currntStateNum: number) => {
        if (currntStateNum < 50) {
            return StyleSheet.create( { color: {backgroundColor: '#E23535'}} );
        } else if (currntStateNum > 50 && currntStateNum < 80) {
            return StyleSheet.create( { color: {backgroundColor: '#FCB712'}} );
        } else {
            return StyleSheet.create( { color: {backgroundColor: '#4EB734'}} );
        }
    };

    render(): JSX.Element {
        let statusBarItems: JSX.Element[] = [];

        for (let [key, value] of Object.entries(this.state._icons)) {
            statusBarItems.push(<TouchableOpacity onPress={() => { }}
                                               style={[styles.iconStyleSubMenu, this.getCurrentColor(value.currentState).color]}
                                               activeOpacity={1}
                                               key={key}>
                                    <Image source={value.link} />
                            </TouchableOpacity>);
        }
        
        let statsItems: JSX.Element[] = [];

        for (let [,value] of Object.entries(this.state._icons)) {
            statsItems.push(<View style={{flexDirection: 'row', marginBottom: 30}}>
                                <View style={[styles.iconStyleSubMenu, this.getCurrentColor(value.currentState).color, {marginRight: 0}]}>
                                    <Image source={value.link} />
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: "center"}}>
                                    <Text style={styles.modalStatePropName}>{value.name}: </Text>
                                    <Text style={styles.modalStatePropNumber}>{value.currentState}%</Text>
                                </View>
                            </View>);
        }

        statsItems.push(<View style={{flexDirection: 'row', marginBottom: 30}}>
                                        <View style={[styles.iconStyleSubMenu, {marginRight: 0}]}>
                                            <Image source={this.state._money.link} />
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: "center"}}>
                                            <Text style={styles.modalStatePropName}>{this.state._money.name}: </Text>
                                            <Text style={styles.modalStatePropNumber}>{this.state._money.currentState}</Text>
                                        </View>
                                    </View>);

        statsItems.push(<View style={{flexDirection: 'row'}}>
                                <View style={[styles.iconStyleSubMenu, {marginRight: 0}]}>
                                    <Image source={require('./assets/lvl-icon.png')} />
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: "center"}}>
                                <Text style={styles.modalStatePropName}>Уровень {this.state.level.number}: </Text>
                                <Text style={styles.modalStatePropNumber}>{this.state.level.exp} exp</Text>
                                </View>
                            </View>);

        return (
            <View style = {Dimensions.get('screen').height - Dimensions.get('window').height > 25 ? styles.notchPadding : null}>
                <Modal animationType='fade'
                       transparent={true}
                       visible={this.state.settingsModalVisible}
                       onRequestClose={() => {this.setState({settingsModalVisible: false})}}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <Text style={[styles.modalTitle]}>Настройки</Text>

                            <View style={styles.modalSettingItem}>
                                <View style={styles.modalSettingsTitleBox}> 
                                    <Text style={[styles.modalSettingsTitle]}>Яркость</Text>
                                </View>
                                <View style={{flexDirection: 'row', height: '50%', justifyContent: 'center', alignItems: 'center'}}> 
                                    <TouchableOpacity style={styles.modalSettingArrow} onPress={() => {
                                        clickAudioEffect();
                                    }}>
                                        <Image source={require('./assets/modalFiles/arrow-left.png')}/>
                                    </TouchableOpacity>
                                    <Text style={styles.modalSettingNumber}>{5}</Text>
                                    <TouchableOpacity style={styles.modalSettingArrow} onPress={() => {
                                        clickAudioEffect();
                                    }}>
                                        <Image source={require('./assets/modalFiles/arrow-right.png')}/>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.modalSettingItem}>
                                <View style={styles.modalSettingsTitleBox}> 
                                    <Text style={[styles.modalSettingsTitle]}>Громкость эффектов</Text>
                                </View>
                                <View style={{flexDirection: 'row', height: '50%', justifyContent: 'center', alignItems: 'center'}}> 
                                    <TouchableOpacity style={styles.modalSettingArrow} onPress={() => clickAudioEffect()}><Image source={require('./assets/modalFiles/arrow-left.png')}/></TouchableOpacity>
                                    <Text style={styles.modalSettingNumber}>5</Text>
                                    <TouchableOpacity style={styles.modalSettingArrow} onPress={() => clickAudioEffect()}><Image source={require('./assets/modalFiles/arrow-right.png')}/></TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.modalSettingItem}>
                                <View style={styles.modalSettingsTitleBox}> 
                                    <Text style={[styles.modalSettingsTitle]}>Громкость музыки</Text>
                                </View>
                                <View style={{flexDirection: 'row', height: '50%', justifyContent: 'center', alignItems: 'center'}}> 
                                    <TouchableOpacity style={styles.modalSettingArrow} onPress={() => clickAudioEffect()}><Image source={require('./assets/modalFiles/arrow-left.png')}/></TouchableOpacity>
                                    <Text style={styles.modalSettingNumber}>5</Text>
                                    <TouchableOpacity style={styles.modalSettingArrow} onPress={() => clickAudioEffect()}><Image source={require('./assets/modalFiles/arrow-right.png')}/></TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.modalExitButton} onPress={() => { clickAudioEffect(); BackHandler.exitApp(); } }>
                                <Text style={styles.modalExitButtonText}>кароче типа выйти</Text>
                            </TouchableOpacity>
                        </View>   
                    </View>
                </Modal>
                
                <Modal animationType='fade'
                       transparent={true}
                       visible={this.state.statsModalVisible}
                       onRequestClose={() => {this.setState({statsModalVisible: false})}}>
                    <View style={styles.modalContainer}>
                        <View style={[styles.modalView, {height: '87%'}]}>
                            <Text style={[styles.modalTitle]}>Состояние {"\n"} героя</Text>
                            
                            <View style={{justifyContent: "center", alignItems: 'center'}}>{statsItems}</View>
                            
                            <TouchableOpacity style={styles.modalExitButton} onPress={() => { this.setState({statsModalVisible: false}); clickAudioEffect(); } }>
                                <Text style={styles.modalExitButtonText}>Назад</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View style={styles.StatusBar}>
                    <TouchableOpacity style={[styles.iconStyle, styles.defaultMargin]} onPress = {() => {
                        this.setState({statsModalVisible: true});
                        clickAudioEffect();
                    }}>
                                <Text style={styles.levelText} >{this.state.level.number}</Text>
                    </TouchableOpacity>

                    <View style={[styles.StatusBarSubMenu, styles.defaultMargin]}>
                        {statusBarItems}
                    </View>

                    <TouchableOpacity style={[styles.iconStyle, styles.defaultMargin]} onPress={() => {
                        this.setState({settingsModalVisible: true});
                    }}>
                        <Image source={require('./assets/settings.png')} />
                    </TouchableOpacity>              
                </View>
            </View>
        );
    }
}
