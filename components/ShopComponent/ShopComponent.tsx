import React, { Component } from "react";

import {InventoryConstructor } from '../InventoryConstructor/InventoryConstructor';


interface ShopItem {
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

    data: ShopItem[] = [    {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                        {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                        {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                        {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                        {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                        {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                        {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                        {title: 'Шаasdasdрик', desc: 'Шasdsadарик', buffs: 10, debuf: 10, price: 10},
                        {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                        {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                        {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                        {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                        {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                        {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                        {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                        {title: 'Шарик', desc: 'Шарик', buffs: 10, debuf: 10, price: 10},
                        {title: 'gfhjfghj', desc: 'Шарfhjghfjик', buffs: 10, debuf: 10, price: 10}, ];

    render() {
        return (
            <InventoryConstructor 
                topElemProps = {
                    {
                        text: 'Уничтожить',
                        handler: () => { console.log(123); }
                    }
                }
                bottomElemProps = {
                    { text: 'Купить', 
                      handler: () => { console.log(2 + 2); }
                    }
                }
                data = { this.data }
            />
        );
    }
}
