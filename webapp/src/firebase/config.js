import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCkeUa83kmArv-V0lraRyYq2ttcmeid8Z0',
  authDomain: 'divvy-transaction-app.firebaseapp.com',
  projectId: 'divvy-transaction-app',
  storageBucket: 'divvy-transaction-app.appspot.com',
  messagingSenderId: '566546045568',
  appId: '1:566546045568:web:b4f37d573937d110df2465'
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init service
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }
