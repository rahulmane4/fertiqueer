// firebaseConfig.js
import firebase from '@react-native-firebase/app';
import firebase_auth from '@react-native-firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_JPGx9Zb-uErFXFq9UgBxbU0l73uHEMo",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "fertiqueer-abd4a",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "8518678380",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
