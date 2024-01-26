// src/services/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBmEn_P6TiX7mckBpXuOHhFM5ptC4znEqg",
  authDomain: "react-mobx-firebase-app-9cff0.firebaseapp.com",
  projectId: "react-mobx-firebase-app-9cff0",
  storageBucket: "react-mobx-firebase-app-9cff0.appspot.com",
  messagingSenderId: "263326959373",
  appId: "1:263326959373:web:925acc1d5aa1ae42ad1244"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { firebaseApp, db };
