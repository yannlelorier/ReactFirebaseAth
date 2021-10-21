import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_KEY,
  authDomain: process.env.REACT_APP_DOM,
  projectId: process.env.REACT_APP_PROJID,
  storageBucket: process.env.REACT_APP_STORB,
  messagingSenderId: process.env.REACT_APP_MSGSENDID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MSRID
};


let instance;

export default function getFirebase() {
  if (typeof window !== "undefined") {
    if (instance) return instance;
    instance = firebase.initializeApp(firebaseConfig);
    return instance;
  }
  return null;
}
