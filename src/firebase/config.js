import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

import { getEnvVariables } from "../helpers/getEnvVariables";
const {
    firebaseApiKey,
    firebaseAuthDomain,
    firebaseAppId,
    firebaseMessagingSenderId,
    firebaseProjectId,
    firebaseStorageBucket
} = getEnvVariables();

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessagingSenderId,
  appId: firebaseAppId
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);