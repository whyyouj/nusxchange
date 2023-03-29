import firebase from 'firebase/compat/app'

const firebaseConfig = {
    apiKey: "AIzaSyAaTCK3fplFLx5K-o7nezZf1tgHyifkA9I",
    authDomain: "nusxchange-f600d.firebaseapp.com",
    projectId: "nusxchange-f600d",
    storageBucket: "nusxchange-f600d.appspot.com",
    messagingSenderId: "654067477835",
    appId: "1:654067477835:web:50feee9ff85285ab0c8cce"
    
  };

firebase.initializeApp(firebaseConfig)

export default firebase;