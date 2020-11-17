
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBRSCDKtA3W9RvlI5p0W7E3xSt4l5bQhaQ",
    authDomain: "whatsappwithusers.firebaseapp.com",
    databaseURL: "https://whatsappwithusers.firebaseio.com",
    projectId: "whatsappwithusers",
    storageBucket: "whatsappwithusers.appspot.com",
    messagingSenderId: "541359823822",
    appId: "1:541359823822:web:e9477942636dc7252d699f",
    measurementId: "G-7TKGK1VZH1"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db =firebaseApp.firestore();
const auth=firebase.auth();
const provider =new firebase.auth.GoogleAuthProvider();

  export default db;
  export {auth,provider} ;




