// Import the functions you need from the SDKs you need
import { getDatabase, onValue, ref, set, update } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdKa4IZWi6FdSANNJaSOY22ycJO_Sog5M",
  authDomain: "stayhydrated-41d70.firebaseapp.com",
  databaseURL: "https://stayhydrated-41d70-default-rtdb.firebaseio.com",
  projectId: "stayhydrated-41d70",
  storageBucket: "stayhydrated-41d70.appspot.com",
  messagingSenderId: "1015538756892",
  appId: "1:1015538756892:web:a7dcdd79388ed8b973ded9",
  measurementId: "G-GCE596K3JW"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const database = getDatabase(firebase);


export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const dbRef = ref(database, path);
    const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    if (devMode) { console.log(`loading ${path}`); }
    return onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      if (devMode) { console.log(val); }
      setData(transform ? transform(val) : val);
      setLoading(false);
      setError(null);
    }, (error) => {
      setData(null);
      setLoading(false);
      setError(error);
    });
  }, [path, transform]);

  return [data, loading, error];
};

export const setData = (path, value) => (
  set(ref(database, path), value)
);

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export const useUserState = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    onIdTokenChanged(getAuth(firebase), setUser);
  }, []);

  return [user];
};

const generateResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated course at: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(generateResult()))
    .catch((error) => setResult(generateResult(error)))
  }, [database, path]);

  return [updateData, result];
};

export { firebaseSignOut as signOut };