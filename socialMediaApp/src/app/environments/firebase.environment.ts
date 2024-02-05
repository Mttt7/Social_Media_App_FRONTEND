
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
    apiKey: "AIzaSyAbrmO5xcqoZMhY4tL5zClha7mP304PktA",
    authDomain: "socialmediaapp-63cbd.firebaseapp.com",
    projectId: "socialmediaapp-63cbd",
    storageBucket: "socialmediaapp-63cbd.appspot.com",
    messagingSenderId: "120758985361",
    appId: "1:120758985361:web:b4af93e6ffaba3bf8cd530",
    measurementId: "G-5VG4M6WYY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);