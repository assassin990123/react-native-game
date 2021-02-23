import React, { Component } from 'react';

import { InventoryConstructor } from './InventoryConstructor/InventoryConstructor';
import FirestoreAPI from 'api/FirestoreAPI';


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

        this._loadInvData();
    }

    _loadInvData() {
        this._firestore.getUserFields('+79991774634').then((res) => {
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
                        handler: () => {
                            console.log(123);
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
