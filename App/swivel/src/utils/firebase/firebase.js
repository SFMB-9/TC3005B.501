import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    // Hide in .env
    apiKey: "AIzaSyCCvl5TuSfNljAoMopwcLQ44Dyz-TPLWZA",
    authDomain: "swivel-test-b63aa.firebaseapp.com",
    projectId: "swivel-test-b63aa",
    storageBucket: "swivel-test-b63aa.appspot.com",
    messagingSenderId: "969238254638",
    appId: "1:969238254638:web:e42ce2f011636d57157bbf"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
