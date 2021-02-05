import React, { Component } from "react";

import {InventoryConstructor } from './InventoryConstructor/InventoryConstructor';
import ShopItemsAPI from "api/ShopItemsAPI";


interface ItemInfo {
    title: string,
    desc: string,
    buffs: number,
    debuf: number, 
    price: number
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
                this.data.push({title: val.name, desc: val.disc, price: val.price, buffs: 0, debuf: 0});
            }
        });

        this.setState({items: this.data});
    }

    api: ShopItemsAPI = new ShopItemsAPI();

    render() {
        return (
            <InventoryConstructor
                bottomElemProps = {
                    { text: 'Купить', 
                      handler: () => { this.api.buyItem(2).then(res => console.log("Shop res " + 2)); }
                    }
                }
                data = { this.data }
            />
        );
    }
}
