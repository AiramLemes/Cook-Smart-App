import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBisSiwhkGYG6e9YAHEWswfSJOUZlG88_E",
    authDomain: "cook-smart-app.firebaseapp.com",
    projectId: "cook-smart-app",
    storageBucket: "cook-smart-app.appspot.com",
    messagingSenderId: "596609878090",
    appId: "1:596609878090:web:dd2e9504df38e733533eb3"
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });


const firestore = getFirestore(app);

const storage = getStorage(app);

export { auth, firestore, storage };

