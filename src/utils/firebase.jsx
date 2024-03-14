import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTV2sL2a201Vm2JKIPkj3_z7NXreVI8LQ",
  authDomain: "videogpt-165fa.firebaseapp.com",
  projectId: "videogpt-165fa",
  storageBucket: "videogpt-165fa.appspot.com",
  messagingSenderId: "950289061046",
  appId: "1:950289061046:web:ae76058a4265b570230217",
  measurementId: "G-EJ6YNXY8FJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();