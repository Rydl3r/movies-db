import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBWKmqTFHB88uRdSYdG8KvDpJ1dyTMVqGM",
  authDomain: "movies-db-8668a.firebaseapp.com",
  projectId: "movies-db-8668a",
  storageBucket: "movies-db-8668a.appspot.com",
  messagingSenderId: "864174649411",
  appId: "1:864174649411:web:16cac87fbeee8fb86ba4f6",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
