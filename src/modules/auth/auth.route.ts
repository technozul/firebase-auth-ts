import { Router, Request, Response } from 'express'
import { verifyToken } from './auth.controller'

const router: Router = Router()

router.post('/verify', (req: Request, res: Response) => {
  const idToken = req.body.idToken?.toString()
  const result = verifyToken(idToken)
  result
    .then((decodedToken) => {
      res.send(decodedToken)
    })
    .catch((error) => {
      res.status(400).send(error)
    })
})

export default router
