import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdPpT1lzswbC9eUq-HDeQJJuQ0mam0ezk",
  authDomain: "cis371-b9190.firebaseapp.com",
  projectId: "cis371-b9190",
  storageBucket: "cis371-b9190.firebasestorage.app",
  messagingSenderId: "684409939923",
  appId: "1:684409939923:web:c6ac5426cb789fd2007126"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
