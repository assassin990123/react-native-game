import React, { Component } from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet, Dimensions, Modal, BackHandler } from 'react-native';
import * as Brightness from 'expo-brightness';

import BackgroundAudioController from 'endpoints/BackgroundAudioController';
import { clickAudioEffect, setAudioEffectVolume } from 'endpoints/AudioEffects';

import { styles } from './styles';
import AsyncStorage from "@react-native-community/async-storage";
import FirestoreAPI from "api/FirestoreAPI";

import EventTimersManager from "endpoints/EventTimersManager";

/*
 *
 @brief: Status bar to display characters needs, such as sleep, food, lvl and etc.
 *
 */


interface IHeroStatusBar {
    handler: Function,
    musicController: BackgroundAudioController
}

export default class HeroStatusBar extends Component<IHeroStatusBar> {
    firestore: FirestoreAPI;

    _musicController: BackgroundAudioController;
    static _defaultBrightness: number;
    _currentBrightness: number;

    static instance?: HeroStatusBar = undefined;

    static state = {
        _icons: {
            satiety: { link: require('./assets/satiety.png'), currentState: 100, name: 'Голод', id: 0 },
            sleep: { link: require('./assets/sleep.png'), currentState: 100, name: 'Бодрость', id: 1 },
            cleanness: { link: require('./assets/cleanness.png'), currentState: 100, name: 'Чистота', id: 2 },
            mood: { link: require('./assets/mood.png'), currentState: 100, name: 'Настроение', id: 3 },
        },

        _money: { link: require('./assets/money.png'), currentState: 0, name: 'Монетки' },

        settingsModalVisible: false,
        statsModalVisible: false,
        currentBrightness: HeroStatusBar._defaultBrightness,
        soundVolume: 1.0,
        effectsVolume: 1.0,
        level: { number: 1, exp: 1000 }
    };

    constructor(props: any) {
        super(props);
        props.handler();

        HeroStatusBar.instance = this;

        this._musicController = props.musicController;

        this.firestore = new FirestoreAPI();

        this.firestore.getUserFields("+79991774634")
            .then(async(data) => {
                if (data == undefined) {
                    return;
                }

                await AsyncStorage.setItem("eatPoints", String(data.eatPoints));
                await AsyncStorage.setItem("clearPoints", String(data.clearPoints));
                await AsyncStorage.setItem("moodPoints", String(data.moodPoints));
                await AsyncStorage.setItem("sleepPoints", String(data.sleepPoints));

                HeroStatusBar.instance?.setState({
                    _icons: {
                        ...HeroStatusBar.state._icons, satiety: {
                            ...HeroStatusBar.state._icons.satiety, currentState: data.eatPoints
                        }, sleep: {
                            ...HeroStatusBar.state._icons.sleep, currentState: data.sleepPoints
                        }, cleanness: {
                            ...HeroStatusBar.state._icons.cleanness, currentState: data.clearPoints
                        }, mood: {
                            ...HeroStatusBar.state._icons.mood, currentState: data.moodPoints
                        },
                    }
                });
            });

        EventTimersManager.initTimers(async() => {
            AsyncStorage.getItem("clearPoints")
                .then((clearPoint) => {
                    console.log("clear Point now -> " + clearPoint);

                    if (clearPoint != null && +clearPoint > 0) {
                        AsyncStorage.setItem("clearPoints", String(+clearPoint - 5));
                        AsyncStorage.getItem("clearPoints").then(res => console.log(res));

                        HeroStatusBar.state._icons.cleanness.currentState = +clearPoint - 5;
                        HeroStatusBar.instance?.forceUpdate();

                        this.firestore.setUserFields("+79991774634", { clearPoints: +clearPoint - 5 });
                    }
                });
        }, async() => {
            AsyncStorage.getItem("sleepPoints")
                .then((sleepPoints) => {
                    console.log("sleep Point now -> " + sleepPoints);

                    if (sleepPoints != null && +sleepPoints > 0) {
                        AsyncStorage.setItem("sleepPoints", String(+sleepPoints - 5));
                        AsyncStorage.getItem("sleepPoints").then(res => console.log(res));

                        HeroStatusBar.state._icons.sleep.currentState = +sleepPoints - 5;
                        HeroStatusBar.instance?.forceUpdate();

                        this.firestore.setUserFields("+79991774634", { sleepPoints: +sleepPoints - 5 });
                    }
                });
        }, async() => {
            AsyncStorage.getItem("moodPoints")
                .then((moodPoints) => {
                    console.log("mood Point now -> " + moodPoints);

                    if (moodPoints != null && +moodPoints > 0) {
                        AsyncStorage.setItem("moodPoints", String(+moodPoints - 5));
                        AsyncStorage.getItem("moodPoints").then(res => console.log(res));

                        HeroStatusBar.state._icons.mood.currentState = +moodPoints - 5;
                        HeroStatusBar.instance?.forceUpdate();

                        this.firestore.setUserFields("+79991774634", { moodPoints: +moodPoints - 5 });
                    }
                });
        }, async() => {
            AsyncStorage.getItem("eatPoints")
                .then((eatPoint) => {
                    console.log("eat Point now -> " + eatPoint);

                    if (eatPoint != null && +eatPoint > 0) {
                        AsyncStorage.setItem("eatPoints", String(+eatPoint - 5));
                        AsyncStorage.getItem("eatPoints").then(res => console.log(res));

                        HeroStatusBar.state._icons.satiety.currentState = +eatPoint - 5;
                        HeroStatusBar.instance?.forceUpdate();

                        this.firestore.setUserFields("+79991774634", { eatPoints: +eatPoint - 5 });
                    }
                });
        });
    }

    async componentDidMount() {
        const { status } = await Brightness.requestPermissionsAsync();
        if (status === 'granted') {
            Brightness.getSystemBrightnessAsync().then(res => {
                HeroStatusBar._defaultBrightness = res;
                this._currentBrightness = res;
            });
        }
    }

    getCurrentColor(currentStateNum: number) {
        if (currentStateNum <= 50) {
            return StyleSheet.create({ color: { backgroundColor: '#E23535' } });
        } else if (currentStateNum > 50 && currentStateNum < 80) {
            return StyleSheet.create({ color: { backgroundColor: '#FCB712' } });
        } else {
            return StyleSheet.create({ color: { backgroundColor: '#4EB734' } });
        }
    };

    _settingsModal(): JSX.Element {
        return (<Modal animationType = 'fade'
                       transparent = {true}
                       visible = {HeroStatusBar.state.settingsModalVisible}
                       onRequestClose = {() => {
                           HeroStatusBar.state.settingsModalVisible = false;
                           HeroStatusBar.instance?.forceUpdate();
                       }}>
            <TouchableOpacity style = {styles.modalContainer} onPress = {() => {
                HeroStatusBar.state.settingsModalVisible = false;
                HeroStatusBar.instance?.forceUpdate();
            }} activeOpacity = {1}>
                <TouchableOpacity style = {styles.modalView} activeOpacity = {1}>
                    <Text style = {[styles.modalTitle]}>Настройки</Text>

                    <View style = {styles.modalSettingItem}>
                        <View style = {styles.modalSettingsTitleBox}>
                            <Text style = {[styles.modalSettingsTitle]}>Яркость</Text>
                        </View>
                        <View style = {{
                            flexDirection: 'row', height: '50%', justifyContent: 'center', alignItems: 'center'
                        }}>
                            <TouchableOpacity style = {styles.modalSettingArrow} onPress = {async() => {
                                const { status } = await Brightness.requestPermissionsAsync();
                                if (status === 'granted') {
                                    // DONT TOUCH IF STATEMENT
                                    if (this._currentBrightness >= 0.01 && this._currentBrightness <= 1.1) {
                                        this._currentBrightness = parseFloat((this._currentBrightness - 0.1).toFixed(1));
                                        await Brightness.setSystemBrightnessAsync(this._currentBrightness);
                                        HeroStatusBar.instance?.setState({ currentBrightness: this._currentBrightness });
                                    }
                                }
                                clickAudioEffect();
                            }}
                                              children = {<Image source = {require('./assets/modalFiles/arrow-left.png')} />} />

                            <Text style = {styles.modalSettingNumber}>{~~(this._currentBrightness * 100)}</Text>
                            <TouchableOpacity style = {styles.modalSettingArrow} onPress = {async() => {
                                const { status } = await Brightness.requestPermissionsAsync();
                                if (status === 'granted') {
                                    // DONT TOUCH IF STATEMENT
                                    if (this._currentBrightness >= 0 && this._currentBrightness <= 0.9) {
                                        this._currentBrightness = parseFloat((this._currentBrightness + 0.1).toFixed(1));
                                        await Brightness.setSystemBrightnessAsync(this._currentBrightness);
                                        HeroStatusBar.instance?.setState({ currentBrightness: this._currentBrightness });
                                    }
                                }
                                clickAudioEffect();
                            }} children = {<Image source = {require('./assets/modalFiles/arrow-right.png')} />} />
                        </View>
                    </View>

                    <View style = {styles.modalSettingItem}>
                        <View style = {styles.modalSettingsTitleBox}>
                            <Text style = {[styles.modalSettingsTitle]}>Громкость эффектов</Text>
                        </View>
                        <View style = {{
                            flexDirection: 'row', height: '50%', justifyContent: 'center', alignItems: 'center'
                        }}>
                            <TouchableOpacity style = {styles.modalSettingArrow} onPress = {async() => {
                                // DONT TOUCH IF STATEMENT
                                let volume = HeroStatusBar.state.effectsVolume;
                                if (volume >= 0.01 && volume <= 1.1) {
                                    volume = parseFloat((volume - 0.1).toFixed(1));
                                    HeroStatusBar.state.effectsVolume = volume;
                                    HeroStatusBar.instance?.forceUpdate();
                                    await setAudioEffectVolume(volume);
                                }

                                clickAudioEffect();
                            }} children = {<Image source = {require('./assets/modalFiles/arrow-left.png')} />} />
                            <Text style = {styles.modalSettingNumber}>{HeroStatusBar.state.effectsVolume * 100}</Text>
                            <TouchableOpacity style = {styles.modalSettingArrow} onPress = {async() => {
                                // DONT TOUCH IF STATEMENT
                                let volume = HeroStatusBar.state.effectsVolume;
                                if (volume >= 0 && volume <= 0.9) {
                                    volume = parseFloat((volume + 0.1).toFixed(1));
                                    HeroStatusBar.state.effectsVolume = volume;
                                    HeroStatusBar.instance?.forceUpdate();
                                    await setAudioEffectVolume(volume);
                                }

                                clickAudioEffect();
                            }} children = {<Image source = {require('./assets/modalFiles/arrow-right.png')} />} />
                        </View>
                    </View>

                    <View style = {styles.modalSettingItem}>
                        <View style = {styles.modalSettingsTitleBox}>
                            <Text style = {[styles.modalSettingsTitle]}>Громкость музыки</Text>
                        </View>
                        <View style = {{
                            flexDirection: 'row', height: '50%', justifyContent: 'center', alignItems: 'center'
                        }}>
                            <TouchableOpacity style = {styles.modalSettingArrow} onPress = {async() => {
                                // DONT TOUCH IF STATEMENT
                                let volume = HeroStatusBar.state.soundVolume;
                                if (volume >= 0.01 && volume <= 1.1) {
                                    volume = parseFloat((volume - 0.1).toFixed(1));
                                    HeroStatusBar.state.soundVolume = volume;
                                    HeroStatusBar.instance?.forceUpdate();
                                    HeroStatusBar.instance?._musicController.setPlaybackVolume(volume);
                                }

                                clickAudioEffect();
                            }} children = {<Image source = {require('./assets/modalFiles/arrow-left.png')} />} />
                            <Text style = {styles.modalSettingNumber}>{HeroStatusBar.state.soundVolume * 100}</Text>
                            <TouchableOpacity style = {styles.modalSettingArrow} onPress = {async() => {
                                // DONT TOUCH IF STATEMENT
                                let volume = HeroStatusBar.state.soundVolume;
                                if (volume >= 0 && volume <= 0.9) {
                                    volume = parseFloat((volume + 0.1).toFixed(1));
                                    HeroStatusBar.state.soundVolume = volume;
                                    HeroStatusBar.instance?.forceUpdate();
                                    HeroStatusBar.instance?._musicController.setPlaybackVolume(volume);
                                }

                                clickAudioEffect();
                            }} children = {<Image source = {require('./assets/modalFiles/arrow-right.png')} />} />
                        </View>
                    </View>

                    <TouchableOpacity style = {styles.modalExitButton} onPress = {() => {
                        clickAudioEffect();
                        BackHandler.exitApp();
                    }}>
                        <Text style = {styles.modalExitButtonText}>кароче типа выйти</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>);
    }

    _statsModal(statsItems: JSX.Element[]): JSX.Element {
        return (<Modal animationType = 'fade'
                       transparent = {true}
                       visible = {HeroStatusBar.state.statsModalVisible}
                       onRequestClose = {() => {
                           HeroStatusBar.instance?.setState({ statsModalVisible: false })
                       }}>
            <TouchableOpacity style = {styles.modalContainer} activeOpacity = {1} onPress = {() => {
                HeroStatusBar.state.statsModalVisible = false;
                HeroStatusBar.instance?.forceUpdate();
            }}>
                <TouchableOpacity style = {[styles.modalView, { height: '87%' }]} activeOpacity = {1}>
                    <Text style = {[styles.modalTitle]}>Состояние {"\n"} героя</Text>

                    <View style = {{ justifyContent: "center", alignItems: 'center' }}>{statsItems}</View>

                    <TouchableOpacity style = {styles.modalExitButton} onPress = {() => {
                        clickAudioEffect();
                        HeroStatusBar.state.statsModalVisible = false;
                        HeroStatusBar.instance?.forceUpdate();
                    }}>
                        <Text style = {styles.modalExitButtonText}>Назад</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>);
    }

    render(): JSX.Element {
        let statusBarItems: JSX.Element[] = [];

        for (let [key, value] of Object.entries(HeroStatusBar.state._icons)) {
            statusBarItems.push(<TouchableOpacity onPress = {() => {
            }}
                                                  style = {[styles.iconStyleSubMenu, this.getCurrentColor(value.currentState).color]}
                                                  activeOpacity = {1}
                                                  key = {key}>
                <Image source = {value.link} />
            </TouchableOpacity>);
        }

        let statsItems: JSX.Element[] = [];

        for (let [key, value] of Object.entries(HeroStatusBar.state._icons)) {
            statsItems.push(<View style = {{ flexDirection: 'row', marginBottom: 30 }} key = {key}>
                <View
                    style = {[styles.iconStyleSubMenu, this.getCurrentColor(value.currentState).color, { marginRight: 0 }]}>
                    <Image source = {value.link} />
                </View>
                <View style = {{ flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                    <Text style = {styles.modalStatePropName}>{value.name}: </Text>
                    <Text style = {styles.modalStatePropNumber}>{value.currentState}%</Text>
                </View>
            </View>);
        }

        statsItems.push(<View style = {{ flexDirection: 'row', marginBottom: 30 }} key = {123}>
            <View style = {[styles.iconStyleSubMenu, { marginRight: 0 }]}>
                <Image source = {HeroStatusBar.state._money.link} />
            </View>
            <View style = {{ flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                <Text style = {styles.modalStatePropName}>{HeroStatusBar.state._money.name}: </Text>
                <Text style = {styles.modalStatePropNumber}>{HeroStatusBar.state._money.currentState}</Text>
            </View>
        </View>);

        statsItems.push(<View style = {{ flexDirection: 'row' }} key = {124}>
            <View style = {[styles.iconStyleSubMenu, { marginRight: 0 }]}>
                <Image source = {require('./assets/lvl-icon.png')} />
            </View>
            <View style = {{ flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                <Text style = {styles.modalStatePropName}>Уровень {HeroStatusBar.state.level.number}: </Text>
                <Text style = {styles.modalStatePropNumber}>{HeroStatusBar.state.level.exp} exp</Text>
            </View>
        </View>);

        return (<View
            style = {Dimensions.get('screen').height - Dimensions.get('window').height > 25 ? styles.notchPadding : null}>
            {this._settingsModal()}
            {this._statsModal(statsItems)}

            <View style = {styles.StatusBar}>
                <TouchableOpacity style = {[styles.iconStyle, styles.defaultMargin]} onPress = {() => {
                    clickAudioEffect();
                    HeroStatusBar.state.statsModalVisible = true;
                    HeroStatusBar.instance?.forceUpdate();
                }}>
                    <Text style = {styles.levelText}>{HeroStatusBar.state.level.number}</Text>
                </TouchableOpacity>

                <View style = {[styles.StatusBarSubMenu, styles.defaultMargin]}>
                    {statusBarItems}
                </View>

                <TouchableOpacity style = {[styles.iconStyle, styles.defaultMargin]} onPress = {() => {
                    clickAudioEffect();
                    HeroStatusBar.state.settingsModalVisible = true;
                    HeroStatusBar.instance?.forceUpdate();
                }}>
                    <Image source = {require('./assets/settings.png')} />
                </TouchableOpacity>
            </View>
        </View>);
    }
}
