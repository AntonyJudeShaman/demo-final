import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyB03J6pv9Hcwk04Dvkc7my64DOJ7y-LdDE",
    authDomain: "my-demo-website-19ff0.firebaseapp.com",
    databaseURL: "https://my-demo-website-19ff0-default-rtdb.firebaseio.com",
    projectId: "my-demo-website-19ff0",
    storageBucket: "my-demo-website-19ff0.appspot.com",
    messagingSenderId: "771534320935",
    appId: "1:771534320935:web:15a6fb0de3e41932dd2502",
    measurementId: "G-KN8KXZXJ30"
  };

export const firebaseApp = initializeApp(firebaseConfig);
