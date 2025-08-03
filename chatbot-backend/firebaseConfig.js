// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWJ5rfpajME3fUTJ0gljtknyI_OochwHg",
  // apiKey: "AIzaSyDMdWVU8khjzvmmGvm7eYoQZeINor5FVkA", // commented out old key
  authDomain: "chatbot-ffe11.firebaseapp.com",
  projectId: "chatbot-ffe11",
  storageBucket: "chatbot-ffe11.appspot.com", // corrected bucket domain
  messagingSenderId: "287024746594",
  appId: "1:287024746594:web:7b595dfe2820272ec3013b",
  measurementId: "G-RJCVPDT344",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize authentication
const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Export for use in components
export { auth, googleProvider, githubProvider, signInWithPopup };
