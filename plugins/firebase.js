import firebase from 'firebase/app';
import 'firebase/firestore';


if(!firebase.apps.length) {
    var firebaseConfig = {
        apiKey: "AIzaSyDJxDyfWTql1qLoKajHuhc8VDcr6-DcYUY",
        authDomain: "domnoo-632d6.firebaseapp.com",
        databaseURL: "https://domnoo-632d6.firebaseio.com",
        projectId: "domnoo-632d6",
        storageBucket: "domnoo-632d6.appspot.com",
        messagingSenderId: "890008736035",
        appId: "1:890008736035:web:d15f4681ce95104e117c96",
        measurementId: "G-70LBD4M67L"
    };
      // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    firebase.firestore().settings({
        timestampsInSnapshots: true
    });
}

const db = firebase.firestore();

export default db;