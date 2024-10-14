// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBHgGbWApZ7Ya85oQWxJK2nYW3IHbbrgEQ",
  authDomain: "fertiqueer-abd4a",
  projectId: "8518678380",
  storageBucket: "fertiqueer-abd4a.appspot.com",
  messagingSenderId: "8518678380",
  appId: "fertiqueer-abd4a",
};
const firebaseConfigWeb = {
  apiKey: "AIzaSyBHgGbWApZ7Ya85oQWxJK2nYW3IHbbrgEQ",
  authDomain: "fertiqueer-abd4a.firebaseapp.com",
  projectId: "fertiqueer-abd4a",
  storageBucket: "fertiqueer-abd4a.appspot.com",
  messagingSenderId: "8518678380",
  appId: "1:8518678380:web:3a91a1864d4c8b79ee2549",
  measurementId: "G-VQLB9V778R"
};
// web_client_id='8518678380-56ml695ects1h19hbk35cvf2l7oh6ajp.apps.googleusercontent.com';
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);
export { auth, db };
