import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore'
import 'firebase/storage'

const app = firebase.initializeApp({
  apiKey: "AIzaSyDWnd_1iXnzwZFp9NB0SJyE1IW5EcHpeLU",
  authDomain: "auth-development-8fb61.firebaseapp.com",
  databaseURL: "https://auth-development-8fb61-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "auth-development-8fb61",
  storageBucket: "auth-development-8fb61.appspot.com",
  messagingSenderId: "1059102032376",
  appId: "1:1059102032376:web:9aab265d5693e4175bd60d",
  measurementId: "G-ECMS7J5SDY"

})

export const auth = app.auth()
export const db = app.firestore()
export const storage = app.storage() 
export default app