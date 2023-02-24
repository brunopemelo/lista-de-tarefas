import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCBSHeLJ-fJvWTMDYdXi7BDuvkkWWjuCWc",
    authDomain: "react-course-1c921.firebaseapp.com",
    projectId: "react-course-1c921",
    storageBucket: "react-course-1c921.appspot.com",
    messagingSenderId: "430296019429",
    appId: "1:430296019429:web:fee0c63a1b2aa7e34cff0c",
    measurementId: "G-9EYE1GD51H"
};

const firebaseapp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseapp)

const auth = getAuth(firebaseapp)

export { db, auth }
