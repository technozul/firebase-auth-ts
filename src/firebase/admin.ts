import * as admin from 'firebase-admin'
import serviceAccountKey from '../config/serviceAccountKey.json'

const cert = serviceAccountKey as admin.ServiceAccount

admin.initializeApp({
  credential: admin.credential.cert(cert),
  databaseURL: process.env.FIREBASE_DB_URL,
})

export default admin
