import React, { Component } from 'react';

import { InventoryConstructor } from './InventoryConstructor/InventoryConstructor';
import ShopItemsAPI from 'api/ShopItemsAPI';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { clickAudioEffect } from '../endpoints/AudioEffects';
import { Actions } from 'react-native-router-flux';
import isNetConnected from '../endpoints/NetConnectionContoller';


interface ItemInfo {
    id: number,

    name: string,
    price: number,
    disc: string,
    room: string,

    buff: {
        needBuffName: string,
        buffScale: number,
    },
    debuff: {
        needDebuffName: string,
        debuffScale: number
    }
}

const style = StyleSheet.create({
    modalContainer_net: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        width: '100%',
        height: '100%'
    },

    modalOkButton: {
        backgroundColor: 'white',
        width: '85%',
        height: '20%',
        justifyContent: 'center',
        alignItems:'center',
        borderColor:'#F37052',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },

    modalTitle_Net: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 30,
        marginBottom: 15,
        textAlign: 'center'
    },

    modalOkButtonText: {
        color: '#F37052',
        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
        textAlign: 'center'
    },

    modalView_Net: {
        borderRadius: 10,
        backgroundColor: 'white',
        width: '80%',
        height: '35%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default class ShopComponent extends Component {
    constructor(props: any) {
        super(props);
    }

    state = {
        items: [],
        netErrorModalVisible: false
    }

    data: ItemInfo[] = [];

    async componentDidMount() {
        if (! await isNetConnected()) {
            this.setState({ netErrorModalVisible: true });
            // return;
        }

        await this.api.getShopItems().then(res => {
            for (let key in res) {
                const val = res[key];

                this.data.push({
                    id: val.id,
                    name: val.name,
                    disc: val.disc,
                    price: val.price,
                    room: val.room,
                    buff: { needBuffName: val.buff.needBuffName, buffScale: val.buff.buffScale },
                    debuff: { needDebuffName: val.debuff.needDebuffName, debuffScale: val.debuff.debuffScale }
                });
            }
        });

        this.setState({ items: this.data });
    }

    api: ShopItemsAPI = new ShopItemsAPI();

    render() {
        return (
            <View>
                <Modal animationType = 'fade'
                       transparent = {true}
                       visible = {this.state.netErrorModalVisible}
                       onRequestClose = {() => {
                           this.setState({ netErrorModalVisible: false });
                           Actions.LogIn();
                       }}>
                    <TouchableOpacity style = {style.modalContainer_net} activeOpacity = {1} onPress = {() => {
                        this.setState({ netErrorModalVisible: false });
                        Actions.LogIn();
                    }}>
                        <TouchableOpacity style = {[style.modalView_Net]} activeOpacity = {1}>
                            <Text style = {[style.modalTitle_Net]}>Отсутсвует подключение к сети!</Text>

                            <TouchableOpacity style={style.modalOkButton} onPress={() => { clickAudioEffect(); this.setState({netErrorModalVisible: false}); Actions.LogIn(); } }>
                                <Text style={style.modalOkButtonText}>Понятно</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>

                <InventoryConstructor
                    bottomElemProps = {
                        {
                            text: 'Купить',
                            handler: async (id?: number) => {
                                isNetConnected().then(async res => {
                                    if (! res) {
                                        this.setState({ netErrorModalVisible: true });
                                        return;
                                    }

                                    if ( id != undefined ) {
                                        this.api.buyItem(id).then(() => console.log('Shop res ' + 2));
                                    }
                                });
                            }
                        }
                    }
                    data = {this.data}
                />
            </View>
        );
    }
}
