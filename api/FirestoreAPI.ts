import * as firebase from 'firebase';

import { firebaseConfig, encrypt, decrypt } from './AFG_API_KEYS/ApiKeys';

/*
*
    @brief: Firebase API for firestore.
*
*/

type User = {
    hairColor: String,
    eysColor:  String,
    skinColor: String,
};

type UserData = {
    id: String
    userProps: User,
};

export default class FirestoreAPI {
    private _firestore: firebase.firestore.Firestore;
    private _defaultCollectionName: string = 'users_props';

    private _collectionName: string = '';

    private state = {
        isConnected: false
    };

    private _defaultUserProps: User = {
        hairColor: 'black',
        eysColor:  'pink',
        skinColor: 'white'
    };


    constructor() {
        if ( !firebase.apps.length ) {
            firebase.initializeApp(firebaseConfig);
            this.state.isConnected = true;

            this._firestore = firebase.firestore();
        }
    }

    public isConnected = (): boolean => { return this.state.isConnected; }

    private _setCollectionName(collectionName?: String) {
        if (collectionName !== undefined)
            this._collectionName = collectionName.toString();
        else
            this._collectionName = this._defaultCollectionName;
    }

    private _getUsers = async (collectionName?: String): Promise<UserData[] | undefined> => {
        if ( !this.state.isConnected ) {
            return undefined;
        }

        this._setCollectionName(collectionName);

        let res: UserData[] = [];

        await this._firestore.collection(this._collectionName).get()
            .then(
                (snapshot: firebase.firestore.QuerySnapshot) => {
                    snapshot.forEach((doc: any) => {
                        const docData = doc.data();  // Save data.

                        res.push({ id: decrypt(doc.id), userProps: { hairColor: docData.hairColor,
                                                                     eysColor:  docData.eysColor,
                                                                     skinColor: docData.skinColor } });
                });
            })
            .catch((err: any) => {
                console.error('[fireStoreAPT] -> Error: cant get document', err);
                return undefined;
            });

        return res;
    }

    public getUserFields = async (userName: String, collectionName?: String): Promise<User | undefined> => {
        if ( !this.state.isConnected ) {
            return undefined;
        }

        this._setCollectionName(collectionName);

        const userPropsRef = this._firestore.collection(this._collectionName).doc(encrypt(userName));

        return await userPropsRef.get().then((snapshot: firebase.firestore.DocumentSnapshot) => {
            if (snapshot.exists) {
                const snapData = snapshot.data();

                if (snapData === undefined)
                    return undefined;

                console.log({ hairColor: snapData.hairColor,
                         eysColor:  snapData.eysColor,
                         skinColor: snapData.skinColor });

                return { hairColor: snapData.hairColor,
                         eysColor:  snapData.eysColor,
                         skinColor: snapData.skinColor }
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

        return await this._firestore.collection(this._collectionName)
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
        if ( !this.state.isConnected ) {
            return undefined;
        }

        this._setCollectionName(collectionName);

        const _isUserExist = await this.isUserExist(userName);

        if (_isUserExist === undefined)
            return undefined;
        else if (!_isUserExist)
            return false;

        const userPropsRef = this._firestore.collection(this._collectionName).doc(encrypt(userName));

        for (let [key, value] of Object.entries(newProps)) {
            userPropsRef.set( { [key]: value }, {merge: true} );
        }

        return true;
    };

    public createUser = async (userName: string, collectionName?: string): Promise<boolean | undefined> => {
        if ( !this.state.isConnected ) {
            return undefined;
        }

        this._setCollectionName(collectionName);

        const userPropsRef = this._firestore.collection(this._collectionName).doc(encrypt(userName));

        let _isUserExist = await this.isUserExist(decrypt(userName));

        if (_isUserExist === undefined)
            return undefined;
        else if (!_isUserExist)
            return false;

        return await userPropsRef.get().then((snapshot) => {
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
