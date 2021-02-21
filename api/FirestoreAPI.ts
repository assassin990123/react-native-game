import "firebase/firestore";

import Firestore from './FirestoreInit';
import { decrypt, encrypt } from "./AFG_API_KEYS/ApiKeys";

import { ShopItem } from 'api/ShopItemsAPI';

/*
 *
 @brief: Firebase API for firestore.
 *
 */


type User = {
    name: string,
    skinName: string,
    money: number,
    eatPoints: number,
    clearPoints: number,
    moodPoints: number,
    sleepPoints: number,
    xp: number,

    inv: {
        items: ShopItem[]
    }
};

type UserData = {
    id: string
    userProps: User,
};


export default class FirestoreAPI {
    private _defaultCollectionName: string = 'users_data';
    private _collectionName: string = '';

    private _defaultUserProps: User = {
        name: '', skinName: '', money: 0, xp: 0, eatPoints: 100, clearPoints: 100, moodPoints: 100, sleepPoints: 100, inv: {
            items: []
        }
    };

    private _setCollectionName(collectionName?: String) {
        if (collectionName !== undefined) this._collectionName = collectionName.toString(); else this._collectionName = this._defaultCollectionName;
    }

    // @ts-ignore
    async _getUsers(collectionName?: String): Promise<UserData[] | undefined> {
        this._setCollectionName(collectionName);

        let res: UserData[] = [];

        await Firestore.collection(this._collectionName).get()
            .then((snapshot) => {
                snapshot.forEach((doc: any) => {
                    res.push({
                        id: decrypt(doc.id), userProps: {
                            eatPoints: doc.eatPoints,
                            clearPoints: doc.clearPoints,
                            moodPoints: doc.moodPoints,
                            sleepPoints: doc.sleepPoints,
                            name: doc.name,
                            skinName: doc.skinName,
                            money: doc.money,
                            inv: doc.inv,
                            xp: doc.xp
                        }
                    });
                });
            })
            .catch((err: any) => {
                console.error('[FireStoreAPI] -> Error: cant get document', err);
                return undefined;
            });

        return res;
    }

    public async getUserFields(userName: String, collectionName?: String): Promise<User | undefined> {
        this._setCollectionName(collectionName);

        const userPropsRef = Firestore.collection(this._collectionName).doc(encrypt(userName));

        return await userPropsRef.get().then((snapshot) => {
            if (snapshot.exists) {
                const snapData = Object(snapshot.data());

                if (snapData === undefined) {
                    return undefined;
                }

                return {
                    name: snapData.name,
                    skinName: snapData.skinName,
                    money: snapData.money,
                    inv: snapData.inv,
                    eatPoints: snapData.eatPoints,
                    clearPoints: snapData.clearPoints,
                    moodPoints: snapData.moodPoints,
                    sleepPoints: snapData.sleepPoints,
                    xp: snapData.xp
                };

            } else {
                console.warn('[fireStoreAPT] -> Warn: Document no exists');
                return undefined;
            }
        }).catch((err) => {
            console.error('[fireStoreAPT] -> Error: cant get document', err);
            return undefined;
        });
    };

    public async isUserExist(userName: string, collectionName?: string): Promise<boolean | undefined> {
        this._setCollectionName(collectionName);

        return await Firestore.collection(this._collectionName)
            .doc(encrypt(userName))
            .get().then(snapshot => {
                return snapshot.exists;
            })
            .catch(err => {
                console.error('[fireStoreAPT] -> Error: cant get document', err);
                return undefined;
            });
    }

    public async setUserFields(userName: string, newProps: Object, collectionName?: string): Promise<boolean | undefined> {
        this._setCollectionName(collectionName);

        const _isUserExist = await this.isUserExist(userName);

        if (_isUserExist === undefined) return undefined; else if ( !_isUserExist) return false;

        const userPropsRef = Firestore.collection(this._collectionName).doc(encrypt(userName));
        for (let [key, value] of Object.entries(newProps)) {
            await userPropsRef.set({ [key]: value }, { merge: true });
        }

        return true;
    };

    public async createUser(userName: string, collectionName?: string): Promise<boolean | undefined> {
        this._setCollectionName(collectionName);

        const userPropsRef = Firestore.collection(this._collectionName).doc(encrypt(userName));

        let _isUserExist = await this.isUserExist(decrypt(userName));

        if (_isUserExist === undefined) return undefined; else if (_isUserExist) return false;

        return await userPropsRef.get().then(() => {
            for (let [key, value] of Object.entries(this._defaultUserProps)) {
                userPropsRef.set({ [key]: value }, { merge: true });
            }

            return true;
        })
            .catch((err: any) => {
                console.error('[fireStoreAPT] -> Error: cant get document', err);
                return undefined;
            });
    }
}
