import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-7yLeq1li7MjE0_M3iKmWCgATIxDpWso",
  authDomain: "appfobos.firebaseapp.com",
  projectId: "appfobos",
  storageBucket: "appfobos.firebasestorage.app",
  messagingSenderId: "603133748269",
  appId: "1:603133748269:web:cedf3cfee19527c3e004a4",
};

export const app = initializeApp(firebaseConfig);

const createAuth = () => {
  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    return getAuth(app);
  }
};

export const auth = createAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
