import firestore from './FirestoreInit';
import { decrypt, encrypt } from "./AFG_API_KEYS/ApiKeys";


/*
*
    @brief: Firebase API for firestore.
*
*/

type User = {
    name:      string,
    skinName:  string,
    money:     number,
    inv: {
        items_id: {
           item_id: number,
           count: number
        }[]
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
        name: '',
        skinName: '',
        money: 0,
        inv: {
            items_id: [{ item_id: 0, count: 0 },
                        { item_id: 1, count: 1 },
                        { item_id: 2, count: 2 }]
        }
    };

    private _setCollectionName(collectionName?: String) {
        if (collectionName !== undefined)
            this._collectionName = collectionName.toString();
        else
            this._collectionName = this._defaultCollectionName;
    }

    // @ts-ignore
    private _getUsers = async (collectionName?: String): Promise<UserData[] | undefined> => {
        this._setCollectionName(collectionName);

        let res: UserData[] = [];

        await firestore.collection(this._collectionName).get()
            .then(
                (snapshot) => {
                    snapshot.forEach((doc: any) => {
                        res.push({ id: decrypt(doc.id), userProps: {
                            name: "testName",
                            skinName: "skinName",
                            money: 0,
                            inv: { items_id: [
                                    { item_id: 0, count: 0 },
                                    { item_id: 1, count: 1 },
                                    { item_id: 2, count: 2 }
                                    ]
                            } } });
                });
            })
            .catch((err: any) => {
                console.error('[FireStoreAPI] -> Error: cant get document', err);
                return undefined;
            });

        return res;
    }

    public getUserFields = async (userName: String, collectionName?: String): Promise<User | undefined> => {
        this._setCollectionName(collectionName);

        const userPropsRef = firestore.collection(this._collectionName).doc(encrypt(userName));

        return await userPropsRef.get().then((snapshot) => {
            if (snapshot.exists) {
                const snapData = snapshot.data();

                if (snapData === undefined)
                    return undefined;

                return { name: snapData.name, skinName: snapData.skinName, money:  snapData.money, inv: snapData.inv };

            } else {
                console.warn('[fireStoreAPT] -> Warn: Document no exists');
                return undefined;
            }
        }).catch((err) => {
            console.error('[fireStoreAPT] -> Error: cant get document', err);
            return undefined;
        });
    };

    public isUserExist = async (userName: string, collectionName?: string): Promise<boolean | undefined> => {
        this._setCollectionName(collectionName);

        return await firestore.collection(this._collectionName)
                                    .doc(encrypt(userName))
                                    .get().then(snapshot => {
                                        return snapshot.exists;
                                    })
                                    .catch(err => {
                                        console.error('[fireStoreAPT] -> Error: cant get document', err);
                                        return undefined;
                                    });
    }

    public setUserFields = async (userName: string, newProps: Object, collectionName?: string): Promise<boolean | undefined> => {
        this._setCollectionName(collectionName);

        const _isUserExist = await this.isUserExist(userName);

        if (_isUserExist === undefined)
            return undefined;
        else if (!_isUserExist)
            return false;

        const userPropsRef = firestore.collection(this._collectionName).doc(encrypt(userName));

        for (let [key, value] of Object.entries(newProps)) {
            await userPropsRef.set( { [key]: value }, {merge: true} );
        }

        return true;
    };

    public createUser = async (userName: string, collectionName?: string): Promise<boolean | undefined> => {
        this._setCollectionName(collectionName);

        const userPropsRef = firestore.collection(this._collectionName).doc(encrypt(userName));

        let _isUserExist = await this.isUserExist(decrypt(userName));

        if (_isUserExist === undefined)
            return undefined;
        else if (_isUserExist)
            return false;

        return await userPropsRef.get().then(() => {
                for (let [key, value] of Object.entries(this._defaultUserProps)) {
                    userPropsRef.set( { [key]: value }, {merge: true} );
                }

                return true;
        })
        .catch((err: any) => {
            console.error('[fireStoreAPT] -> Error: cant get document', err);
            return undefined;
        });
    }
}