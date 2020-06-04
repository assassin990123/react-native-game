import * as firebase from 'firebase';

import { firebaseConfig } from './AFG_API_KEYS/ApiKeys';

/*
*
    @brief: Firebase API for firestore.
*
*/

type User = {
    phoneNumber: String,
    props: String
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

    getUsers = async (): Promise<User[]> => { // TODO: PRIVATE THIS SHIT
        if ( !this.state.isConnected ) {
            return [];
        }
        
        const collectionName: string = 'users_props';

        let res: User[] = [];

        await this._firestore.collection(collectionName).get()
            .then(
                (snapshot: any) => {
                snapshot.forEach((doc: any) => {
                    res.push( { phoneNumber: doc.data().phone, props: doc.data().props } )
                });
            })
            .catch((err: any) => { 
                // MBY TRY REREQUIRE
                console.log('Error getting documents', err);
            });
        
        return res;
    }
    
    getUserFields = () => {}; // mby useless.

    setUserData = async (userName: string, prop: string | string[], propValue: any | any[]): Promise<boolean> => { 
        return true;
    }; 

    addUserField = async (userName: string, props: string | string[], propBalue: any | any[]): Promise<boolean> => {
        return true;
    };

    createUser = async (userName: string): Promise<boolean> => {
        // TODO: md5.
        return true;
    }

    _firestore: firebase.firestore.Firestore;

    state = {
        isConnected: false
    };
}