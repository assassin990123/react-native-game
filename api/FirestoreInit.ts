import * as firebase from "firebase";
import "firebase/firestore";

import { firebaseConfig } from './AFG_API_KEYS/ApiKeys';

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig).firestore()
    : firebase.app().firestore();
