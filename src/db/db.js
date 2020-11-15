import firebase from 'firebase/app';
import "firebase/analytics";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDlYmErW5iSnyctegf8unpF_4hW6AwKqZw",
    authDomain: "dragonball-fighterz-combos.firebaseapp.com",
    databaseURL: "https://dragonball-fighterz-combos.firebaseio.com",
    projectId: "dragonball-fighterz-combos",
    storageBucket: "dragonball-fighterz-combos.appspot.com",
    messagingSenderId: "774171031330",
    appId: "1:774171031330:web:e0f21c0d12711f01af177b",
    measurementId: "G-GGJ2BE99EP"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();


const firestore = firebase.firestore();
const auth = firebase.auth();
const analytics = firebase.analytics();
const storage = firebase.storage();

export { firestore, auth, analytics, storage };