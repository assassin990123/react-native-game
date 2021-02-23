import firestore from './FirestoreInit';
import FirestoreAPI from 'api/FirestoreAPI';

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

    buff?: {
        needBuffName?: string,
        buffScale?: number,
    },
    debuff?: {
        needDebuffName?: string,
        debuffScale?: number
    }
};

const data: ShopItem[] = [
    { id: 0, name: '123', price: 10, disc: 'POSOSI OK1??7?', room: '123' },
    { id: 1, name: '123', price: 10, disc: 'POSOSI OK2??7?', room: '123' },
    { id: 2, name: '123', price: 10, disc: 'POSOSI OK3??7?', room: '123' },
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

        return await shopItemsRef.get().then(() => {
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
        let res = await super.getUserFields('+79991774634');

        let invRes: any[] = [];

        res?.inv.items.forEach(data => {
            invRes.push(data);
        });

        if ( await this.isValidId(itemId) ) {
            this._getItemDataByID(itemId).then(item => {
                super.setUserFields('+79991774634', { inv: { items: invRes.concat([{ item: item }]) } }, 'users_data').then();
            });

            return true;
        }

        return undefined;
    }

}
