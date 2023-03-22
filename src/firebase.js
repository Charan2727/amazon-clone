// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import * as firebase from "firebase/app";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from "firebase/auth";




const firebaseConfig = {
    apiKey: "AIzaSyArL8u0epTqZHCHua9s-nLo12q2KJofaZk",
    authDomain: "clone-e9240.firebaseapp.com",
    projectId: "clone-e9240",
    storageBucket: "clone-e9240.appspot.com",
    messagingSenderId: "943663096933",
    appId: "1:943663096933:web:55415225284fef122d128c",
    measurementId: "G-NLJQZ781HN"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export { db, auth };