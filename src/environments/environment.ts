import { initializeApp } from "firebase/app";

export const environment = {
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxZIKtuQ3gFXnAjWSVnmgh51pPxmSPjmA",
  authDomain: "christmas-list-4b180.firebaseapp.com",
  projectId: "christmas-list-4b180",
  storageBucket: "christmas-list-4b180.appspot.com",
  messagingSenderId: "1064787530858",
  appId: "1:1064787530858:web:27f5f984d09486586d6613"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);