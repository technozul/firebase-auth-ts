import express, { Router, Request, Response } from 'express'
import admin from '../firebase/admin'

const router: Router = Router()
router.post('/verify', (req: Request, res: Response) => {
  const idToken = req.body.idToken?.toString()
  const checkRevoked = true

  if (!idToken) {
    res.status(400).send({
      error: 'token not provided.'
    })
    return
  }

  admin
    .auth()
    .verifyIdToken(idToken, checkRevoked)
    .then((token) => {
      res.send(token)
    })
    .catch((error) => {
      res.status(401).send({
        error
      })
    })
})

export default router
