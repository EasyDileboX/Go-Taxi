// src/firebase/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

let firebaseApp;
let auth;
let db;

export function initFirebase() {
  if (firebaseApp) return { auth, db };

  // Replace these values with your Firebase project config or use env vars
  const firebaseConfig = {
    apiKey: Constants.manifest.extra?.FIREBASE_API_KEY || process.env.FIREBASE_API_KEY || 'FIREBASE_API_KEY',
    authDomain: Constants.manifest.extra?.FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN || 'FIREBASE_AUTH_DOMAIN',
    projectId: Constants.manifest.extra?.FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID || 'FIREBASE_PROJECT_ID',
    storageBucket: Constants.manifest.extra?.FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET || 'FIREBASE_STORAGE_BUCKET',
    messagingSenderId: Constants.manifest.extra?.FIREBASE_MESSAGING_SENDER_ID || process.env.FIREBASE_MESSAGING_SENDER_ID || 'FIREBASE_MESSAGING_SENDER_ID',
    appId: Constants.manifest.extra?.FIREBASE_APP_ID || process.env.FIREBASE_APP_ID || 'FIREBASE_APP_ID'
  };

  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);

  return { auth, db };
}
