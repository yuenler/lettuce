import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC-o8TRmMAQb5sWe9HdxzAtbjba7mY-EMU",
  authDomain: "lettuce-save.firebaseapp.com",
  projectId: "lettuce-save",
  storageBucket: "lettuce-save.appspot.com",
  messagingSenderId: "300545379976",
  appId: "1:300545379976:web:a20d6348c1d13e644f193d",
  measurementId: "G-XGFXPS3BLJ"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, firestore, auth };
