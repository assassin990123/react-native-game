import React, { Component } from 'react';

import { InventoryConstructor } from './InventoryConstructor/InventoryConstructor';
import ShopItemsAPI from 'api/ShopItemsAPI';


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


export default class ShopComponent extends Component {
    constructor(props: any) {
        super(props);
    }

    state = {
        items: []
    }

    data: ItemInfo[] = [];

    async componentDidMount() {
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
            <InventoryConstructor
                bottomElemProps = {
                    {
                        text: 'Купить',
                        handler: (id?: number) => {
                            if ( id != undefined ) {
                                this.api.buyItem(id).then(() => console.log('Shop res ' + 2));
                            }
                        }
                    }
                }
                data = {this.data}
            />
        );
    }
}
