// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAkhZoRv0HWzA68P3bR-1znwCvsza8_CNQ',
  authDomain: 'ozynfit.firebaseapp.com',
  projectId: 'ozynfit',
  storageBucket: 'ozynfit.appspot.com',
  messagingSenderId: '391647042415',
  appId: '1:391647042415:web:d57ce22dde7620c9f6269a',
  measurementId: 'G-LV2NYBM1V3'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
