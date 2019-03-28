import * as firebase from "firebase";
//AIzaSyCwg8TalbXQU9EX5aQNBcjrt4g8GXcjJ_U
let config = {
  apiKey: "AIzaSyDhMZ6QU4BID6sEiSlOtMck0QLJaNuzAg8",
  authDomain: "halflajf-9d586.firebaseapp.com",
  databaseURL: "https://halflajf-9d586.firebaseio.com",
  projectId: "halflajf-9d586",
  storageBucket: "halflajf-9d586.appspot.com",
  messagingSenderId: "623585970782",
  appId: "1:623585970782:web:21eb6d715ae44828"
};

//1:623585970782:web:d508ecab53c829d8

export const auth = firebase.auth;
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const provider = new firebase.auth.FacebookAuthProvider();
export const serverValue = firebase.database.ServerValue;

export default (!firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app());
