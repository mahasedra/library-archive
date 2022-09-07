import * as firebase from "firebase";
import "firebase/database";

let config = {
  apiKey: "AIzaSyDHlTl-Q5vMW9uDxR5E0qtt3KEeovxnhWk",
  authDomain: "mahasedra-db.firebaseapp.com",
  databaseURL: "https://mahasedra-db-default-rtdb.firebaseio.com/",
  projectId: "mahasedra-db",
  storageBucket: "mahasedra-db.appspot.com",
  messagingSenderId: "1006210624031",
  appId: "1:1006210624031:web:4fd1693b4c5b4ec294832a"
};

firebase.initializeApp(config);

export default firebase.database();

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDHlTl-Q5vMW9uDxR5E0qtt3KEeovxnhWk",
//   authDomain: "mahasedra-db.firebaseapp.com",
//   databaseURL: "https://mahasedra-db.firebaseio.com",
//   projectId: "mahasedra-db",
//   storageBucket: "mahasedra-db.appspot.com",
//   messagingSenderId: "1006210624031",
//   appId: "1:1006210624031:web:4fd1693b4c5b4ec294832a"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);