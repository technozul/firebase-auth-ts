import { auth } from 'firebase-admin'
import firebaseAdmin from '../../firebase/firebaseAdminInstance'

async function verifyToken(
  idToken: string,
  checkRevoked: boolean = true
): Promise<auth.DecodedIdToken> {
  return await firebaseAdmin.auth().verifyIdToken(idToken, checkRevoked)
}

export { verifyToken }
