import firebase from "firebase";
import secret_keys from "./secret_keys";

const firebaseConfig = {
  apiKey: secret_keys.REACT_APP_FIREBASE_API_KEY,
  authDomain: secret_keys.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: secret_keys.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: secret_keys.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: secret_keys.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: secret_keys.REACT_APP_FIREBASE_APP_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
const db = firebaseApp.firestore();

export { auth, provider, db, storage };
