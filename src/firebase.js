import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB4nCd3417mfmtQmR_Eb4-njEQErieaYGY",
  authDomain: "linkedin-clone-4f3d0.firebaseapp.com",
  projectId: "linkedin-clone-4f3d0",
  storageBucket: "linkedin-clone-4f3d0.appspot.com",
  messagingSenderId: "627865786258",
  appId: "1:627865786258:web:b21f1fda6bab7b2bd8934b",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, provider, storage };
export default db;
