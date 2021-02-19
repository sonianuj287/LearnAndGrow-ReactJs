import firebase from "firebase";
import "firebase/storage";
// import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHRWzb2dNlaD_OTYM5r3GU-d942LYuGTI",
    authDomain: "learnandgrow-82f0b.firebaseapp.com",
    databaseURL: "https://learnandgrow-82f0b-default-rtdb.firebaseio.com",
    projectId: "learnandgrow-82f0b",
    storageBucket: "learnandgrow-82f0b.appspot.com",
    messagingSenderId: "82138091405",
    appId: "1:82138091405:web:71ccf3984668c7fc1f37c4",
    measurementId: "G-1PTMF9W2GW"
  };

// Initialize Firebase
const storage = firebase.storage();
// var db = firebase.firestore();

export default storage;
