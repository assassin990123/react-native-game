import * as firebase from 'firebase';

import { firebaseConfig } from './AFG_API_KEYS/ApiKeys';

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
    id: string
    userProps: User,
};

export default class FirestoreAPI {
    private _firestore: firebase.firestore.Firestore;
    private _defaultCollectionName: string = 'users_props';

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

    private getUsers = async (): Promise<UserData[]> => {
        if ( !this.state.isConnected ) {
            return [];
        }

        let res: UserData[] = [];

        await this._firestore.collection(this._defaultCollectionName).get()
            .then(
                (snapshot: firebase.firestore.QuerySnapshot) => {
                    snapshot.forEach((doc: any) => {
                        const docData = doc.data();  // Save data.

                        res.push({ id: doc.id, userProps: { hairColor: docData.eysColor, 
                                                            eysColor:  docData.eysColor, 
                                                            skinColor: docData.skinColor } });
                });
            })
            .catch((err: any) => { 
                console.error('[fireStoreAPT] -> Error getting documents. Error: ' + err);
                return [];
            });
        
        console.log(res);
        return res;
    }
    
    public getUserFields = async (userName: String): Promise<User | undefined> => {
        if ( !this.state.isConnected ) {
            return undefined;
        }

        let userPropsRef = this._firestore.collection(this._defaultCollectionName).doc(userName.toString());
        return await userPropsRef.get().then((snapshot: firebase.firestore.DocumentSnapshot) => {
            if (snapshot.exists) {
                const snapData = snapshot.data();

                if (snapData === undefined)
                    return undefined;

                return { hairColor: snapData.hairColor,
                         eysColor:  snapData.eysColor,
                         skinColor: snapData.skinColor }
            } else {
                console.warn('[fireStoreAPT] -> Document no exists')
                return undefined;
            }
        }).catch((err) => {
            console.error('[fireStoreAPT] -> Error getting document:', err);
            return undefined;
        });
    }; 

    public setUserFields = async (userName: string, newProps: Object): Promise<boolean> => {
        if ( !this.state.isConnected ) {
            return false;
        }

        let userPropsRef = this._firestore.collection(this._defaultCollectionName).doc(userName);
        
        const isUserExist = await userPropsRef.get().then((snapshot) => {
            if (snapshot.exists) {
                return true;
            }
            else {
                return false;
            }
        });
        
        if (!isUserExist) {
            return false;
        }

        for (let [key, value] of Object.entries(newProps)) {
            userPropsRef.set( { [key]: value }, {merge: true} );
        }

        return true;
    };

    public createUser = async (userName: string): Promise<boolean> => {
        // TODO: md5.
        // TODO: check user created or no.

        if ( !this.state.isConnected ) {
            return false;
        }

        const userPropsRef = this._firestore.collection(this._defaultCollectionName).doc(userName);
        
        return await userPropsRef.get().then((snapshot) => {
            if (snapshot.exists) {
                return false;
            }
            else {
                for (let [key, value] of Object.entries(this._defaultUserProps)) {
                    userPropsRef.set( { [key]: value }, {merge: true} );
                }

                return true;
            }
        })
        .catch((err: any) => {
            console.error('[fireStoreAPT] -> Error create document:', err)
            return false;
        });
    }
}