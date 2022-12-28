// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAryDnuf5gS5gREzOz2Hq9uCTwAlASeKUM",
  authDomain: "you-gallery-rn.firebaseapp.com",
  projectId: "you-gallery-rn",
  storageBucket: "you-gallery-rn.appspot.com",
  messagingSenderId: "316350288170",
  appId: "1:316350288170:web:3f451a215efc9597bc4e53",
  measurementId: "G-N8C3D4H0EN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export default firebase.initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
