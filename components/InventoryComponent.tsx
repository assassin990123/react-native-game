import React, { Component } from 'react';

import { InventoryConstructor } from './InventoryConstructor/InventoryConstructor';
import FirestoreAPI from 'api/FirestoreAPI';
import AsyncStorage from '@react-native-community/async-storage';


type ItemInfo = {
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


export default class InvComponent extends Component {
    _firestore: FirestoreAPI;
    _data: ItemInfo[];

    state = {
        data: []
    };

    constructor(props: any) {
        super(props);

        this._firestore = new FirestoreAPI();
        this._data = [];

        this._loadInvData()
            .then(() => {
                console.log('[InventoryComponent] -> Data loaded!');
            })
            .catch(err => {
                console.error(err);
            });
    }

    async _loadInvData() {
        const phoneNumber = await AsyncStorage.getItem('phoneNumber');
        if (phoneNumber == null) {
            return;
        }

        this._firestore.getUserFields(phoneNumber).then((res) => {
            if ( res == undefined ) {
                return;
            }

            for (let obj of res.inv.items) {
                // @ts-ignore
                const item = obj.item;

                this._data.push({
                    id: item.id,
                    name: item.name,
                    disc: item.disc,
                    price: item.price,
                    room: item.room,
                    buff: { needBuffName: item.buff.needBuffName, buffScale: item.buff.buffScale },
                    debuff: { needDebuffName: item.debuff.needDebuffName, debuffScale: item.debuff.debuffScale }
                } as ItemInfo);

                this.setState({ data: this._data });
            }
        });
    }

    render() {
        return (
            <InventoryConstructor
                topElemProps = {
                    {
                        text: 'Применить',
                        handler: () => { // TODO:  handler: (id?: number)
                            console.log(123 + " KEKW");
                        }
                    }
                }
                bottomElemProps = {
                    {
                        text: 'Инфо',
                        handler: () => {
                        }
                    }
                }
                data = {this._data}
            />
        );
    }
}
