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
    constructor() {
        if ( !firebase.apps.length ) { 
            firebase.initializeApp(firebaseConfig); 
            this.state.isConnected = true; 
        } 
        else { 
            // TODO(glazynov): do it somehow ok .......
            return;
        }
        
        this._firestore = firebase.firestore(); 
    }

    /*private*/ getUsers = async (): Promise<UserData[]> => {
        if ( !this.state.isConnected ) {
            return [];
        }
        
        const collectionName: string = 'users_props';

        let res: UserData[] = [];

        await this._firestore.collection(collectionName).get()
            .then(
                (snapshot: any) => {
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
        
        return res;
    }
    
    getUserFields = async (userName: String): Promise<User | undefined> => {
        if ( !this.state.isConnected ) {
            return undefined;
        }

        let userDocRef = this._firestore.collection('users_props').doc(userName.toString());
        await userDocRef.get().then((snapshot: firebase.firestore.DocumentSnapshot) => {
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
        }).catch(function(err) {
            console.error('[fireStoreAPT] -> Error getting document:', err);
        });

    }; 

    setUserFields = async (userName: string, newProps: Object): Promise<boolean> => {
        // @info : if user doent exists it will be created.

        if ( !this.state.isConnected ) {
            return false;
        }

        let userPropsRef = this._firestore.collection('users_props').doc(userName);

        for (let [key, value] of Object.entries(newProps)) {
            userPropsRef.set( { [key]: value }, {merge: true} );
        }

        return true;
    };

    createUser = async (userName: string): Promise<boolean> => {
        // TODO: md5.
        // TODO: check user created or no.
        return true;
    }

    private _firestore: firebase.firestore.Firestore;

    private state = {
        isConnected: false
    };
}