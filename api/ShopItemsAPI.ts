import firestore from './FirestoreInit';
import FirestoreAPI from 'api/FirestoreAPI';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Buffs from 'utils/ItemsBuffs';

/*
 *
 @brief: API for buying items.
 *
 */


export type ShopItem = {
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
};

const data: ShopItem[] = [
    {
        id: 0,
        name: 'Шарик',
        price: 5,
        disc: 'Это шарик с гелеем',
        room: '123',
        buff: { needBuffName: Buffs.mood, buffScale: 7 },
        debuff: { needDebuffName: Buffs.eat, debuffScale: 3 }
    },
    {
        id: 1,
        name: 'Рамен',
        price: 10,
        disc: 'Вкусный рамен',
        room: '123',
        buff: { needBuffName: Buffs.eat, buffScale: 10 },
        debuff: { needDebuffName: Buffs.cleanness, debuffScale: 2 }
    },
    {
        id: 2,
        name: 'Мыло',
        price: 10,
        disc: 'Мыло, но без веревки',
        room: '123',
        buff: { needBuffName: Buffs.cleanness, buffScale: 12 },
        debuff: { needDebuffName: Buffs.mood, debuffScale: 5 }
    },
    {
        id: 3,
        name: 'Энергетик',
        price: 10,
        disc: 'Понижает сотребность во сне, но здровью хана',
        room: '123',
        buff: { needBuffName: Buffs.sleep, buffScale: 10 },
        debuff: { needDebuffName: Buffs.mood, debuffScale: 5 }
    },
    {
        id: 4,
        name: 'Кофе',
        price: 7,
        disc: 'Понижает сотребность во сне',
        room: '123',
        buff: { needBuffName: Buffs.sleep, buffScale: 7 },
        debuff: { needDebuffName: Buffs.eat, debuffScale: 5 }
    },
    {
        id: 5,
        name: 'Шампунь',
        price: 8,
        disc: 'Не щиплет глазки',
        room: '123',
        buff: { needBuffName: Buffs.cleanness, buffScale: 7 },
        debuff: { needDebuffName: Buffs.sleep, debuffScale: 5 }
    },
    {
        id: 6,
        name: 'Хвостик',
        price: 15,
        disc: 'Хвостик для игр в кошечку',
        room: '123',
        buff: { needBuffName: Buffs.mood, buffScale: 15 },
        debuff: { needDebuffName: Buffs.cleanness, debuffScale: 5 }
    },
    {
        id: 7,
        name: 'Чай',
        price: 10,
        disc: 'Кружечка крепкого чайка',
        room: '123',
        buff: { needBuffName: Buffs.eat, buffScale: 4 },
        debuff: { needDebuffName: Buffs.sleep, debuffScale: 5 }
    },
    {
        id: 8,
        name: 'Конфетки',
        price: 10,
        disc: 'Сладкие как жизнь',
        room: '123',
        buff: { needBuffName: Buffs.eat, buffScale: 15 },
        debuff: { needDebuffName: Buffs.cleanness, debuffScale: 7 }
    },
    {
        id: 9,
        name: 'Косметос',
        price: 10,
        disc: 'Лучшая косметика в этой игре',
        room: '123',
        buff: { needBuffName: Buffs.mood, buffScale: 15 },
        debuff: { needDebuffName: Buffs.cleanness, debuffScale: 5 }
    },
    {
        id: 10,
        name: 'Шоколадный бассейн',
        price: 100,
        disc: 'Можно повеселиться с лучшие другом',
        room: '123',
        buff: { needBuffName: Buffs.mood, buffScale: 50 },
        debuff: { needDebuffName: Buffs.cleanness, debuffScale: 20 }
    },
    {
        id: 11,
        name: 'Заказ в Яндекс.Еда',
        price: 50,
        disc: 'Вкусная еда',
        room: '123',
        buff: { needBuffName: Buffs.eat, buffScale: 25 },
        debuff: { needDebuffName: Buffs.mood, debuffScale: 10 }
    },
    {
        id: 12,
        name: 'СПА',
        price: 80,
        disc: 'Лучшие отдых',
        room: '123',
        buff: { needBuffName: Buffs.cleanness, buffScale: 40 },
        debuff: { needDebuffName: Buffs.sleep, debuffScale: 25 }
    },
    {
        id: 13,
        name: 'Кофеиновые таблетки',
        price: 80,
        disc: 'Бодрят не по детски',
        room: '123',
        buff: { needBuffName: Buffs.sleep, buffScale: 55 },
        debuff: { needDebuffName: Buffs.mood, debuffScale: 30 }
    },
];

export default class ShopItemsAPI extends FirestoreAPI {
    private _shopCollectionName: string = 'shop_items';
    private _itemsDocName: string = 'items_list';

    constructor() {
        super();
    }

    async getShopItems(): Promise<ShopItem[]> {
        const shopItemsRef = firestore.collection(this._shopCollectionName).doc(this._itemsDocName);

        return await shopItemsRef.get().then((data) => {
            return Object(data.data());
        });
    }

    async initShopItems(): Promise<boolean | undefined> {
        const shopItemsRef = firestore.collection(this._shopCollectionName).doc(this._itemsDocName);

        return await shopItemsRef.get()
                                 .then(() => {
                                     for (let [key, value] of Object.entries(data)) {
                                         shopItemsRef.set({ [key]: value }, { merge: true });
                                     }

                                     return true;
                                 })
                                 .catch((err: any) => {
                                     console.error('[fireStoreAPT] -> Error: cant get document', err);
                                     return undefined;
                                 });
    }

    public async isValidId(id: number): Promise<boolean> {
        return await firestore.collection(this._shopCollectionName).doc(this._itemsDocName).get()
                              .then((doc) => {
                                  return Object(doc.data())[id] !== undefined;
                              })
                              .catch(err => {
                                  console.error('[FireStoreAPI] -> Error: cant get document', err);
                                  return false;
                              });
    }

    private async _getItemDataByID(id: number): Promise<ShopItem> {
        return await firestore.collection(this._shopCollectionName).doc(this._itemsDocName).get()
                              .then((doc) => {
                                  return Object(doc.data())[id];
                              });
    }

    public async buyItem(itemId: number): Promise<boolean | undefined> {
        const phoneNumber = await AsyncStorage.getItem('phoneNumber');
        if (phoneNumber == null) {
            return undefined;
        }

        let res = await super.getUserFields(phoneNumber);

        let invRes: any[] = [];

        res?.inv.items.forEach(data => {
            invRes.push(data);
        });

        if ( await this.isValidId(itemId) ) {
            this._getItemDataByID(itemId).then(async item => {
                const data = await super.getUserFields(phoneNumber);
                if (data == null) {
                    return;
                }

                if (data.money >= item.price) {
                    await super.setUserFields(phoneNumber, { inv: { items: invRes.concat([{ item: item }]) }, money: data.money - item.price }, 'users_data');
                    await AsyncStorage.setItem('money', (data.money - item.price).toString());
                }
            });

            return true;
        }

        return undefined;
    }

}
