import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import { firebaseConfig } from './api';

firebase.initializeApp(firebaseConfig);
// firebase.firestore.setLogLevel("silent");

const db = firebase.firestore();
//db.useEmulator("localhost", 8080);

export { db };