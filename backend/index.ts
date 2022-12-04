import { initializeApp } from "firebase/app"
import { getFirestore,getDoc, updateDoc, doc, addDoc, collection } from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
