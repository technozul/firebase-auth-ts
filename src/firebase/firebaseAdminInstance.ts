import * as firebaseAdmin from 'firebase-admin'
import ServiceAccountKey from '../config/serviceAccountKey.json'

const cert = ServiceAccountKey as firebaseAdmin.ServiceAccount

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(cert),
  databaseURL: process.env.FIREBASE_DB_URL
})

export default firebaseAdmin
