import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA902KhO4dJ4GTFP8kCSzAph97NdjybMeM",
  authDomain: "fire-base-e5ddc.firebaseapp.com",
  databaseURL:
    "https://fire-base-e5ddc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fire-base-e5ddc",
  storageBucket: "fire-base-e5ddc.appspot.com",
  messagingSenderId: "226774166949",
  appId: "1:226774166949:web:6750b6fa35acec70a3cc4c",
  measurementId: "G-JV0ZN1B9G8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { app, analytics, database };
