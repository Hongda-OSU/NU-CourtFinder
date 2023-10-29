import { useCallback, useEffect, useState } from "react";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from "firebase/database";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_G1P96FVIDMcWzLwHxVB92YdkB6n-cWY",
  authDomain: "purplebook-73286.firebaseapp.com",
  databaseURL: "https://purplebook-73286-default-rtdb.firebaseio.com",
  projectId: "purplebook-73286",
  storageBucket: "purplebook-73286.appspot.com",
  messagingSenderId: "1071213543297",
  appId: "1:1071213543297:web:2833360665f0a6dc58f280",
};

let firebase;

if (!getApps().length) {
  firebase = initializeApp(firebaseConfig);
} else {
  firebase = getApp();
}

export const database = getDatabase(firebase);
export const getFirebaseStorage = () => {
  return getStorage(firebase);
};

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(
    () =>
      onValue(
        ref(database, path),
        (snapshot) => {
          setData(snapshot.val());
        },
        (error) => {
          setError(error);
        }
      ),
    [path]
  );

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message =
    error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback(
    (value) => {
      update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database, path]
  );

  return [updateData, result];
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => onAuthStateChanged(getAuth(firebase), setUser), []);

  return [user];
};
