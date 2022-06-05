import firebase from 'firebase/app';
import "firebase/storage"



const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: "social-app-4a5e1.firebaseapp.com",
    projectId: "social-app-4a5e1",
    storageBucket: "social-app-4a5e1.appspot.com",
    messagingSenderId: "850939565818",
    appId: "1:850939565818:web:c407e49a0595b9be629b43",
    measurementId: "G-1WHXLGEC09"
  };


  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  export default storage;