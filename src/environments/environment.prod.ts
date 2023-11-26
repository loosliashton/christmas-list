import { initializeApp } from "firebase/app";

export const environment = {
  production: true,
  openAIKey: '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',
};

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
export const app = initializeApp(firebaseConfig);