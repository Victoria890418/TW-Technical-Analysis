import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const hasFirebaseConfig = Boolean(firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId);
const app = hasFirebaseConfig ? initializeApp(firebaseConfig) : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const firebaseReady = hasFirebaseConfig;

export async function loginWithGoogle() {
  if (!auth) throw new Error("Firebase is not configured. Please create .env from .env.example.");
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export async function logoutGoogle() {
  if (!auth) return;
  return signOut(auth);
}

export async function savePortfolioItem(userId, item) {
  if (!db) return null;
  return addDoc(collection(db, "portfolios"), {
    userId,
    ...item,
    createdAt: serverTimestamp(),
  });
}

export async function loadPortfolio(userId) {
  if (!db || !userId) return [];
  const q = query(collection(db, "portfolios"), where("userId", "==", userId), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
