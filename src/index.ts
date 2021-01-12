import { server } from './config/server'
import express, { Application } from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import { createProxyMiddleware } from 'http-proxy-middleware'
import healthRoute from './modules/health/health.route'
import authRoute from './modules/auth/auth.route'
import { verifyToken } from './modules/auth/auth.controller'

const app: Application = express()

/**
 * middlewares
 */
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * auth middleware
 */
const authCheckMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.header('Authorization')
  const bearerToken = (authHeader?.split(' ')[1] || '').toString()
  const result = verifyToken(bearerToken)
  result
    .then(() => {
      next()
    })
    .catch((error) => {
      res.status(400).send(error)
    })
}

/**
 * proxy middlware
 */
const proxyRegisterMiddleware = createProxyMiddleware({
  target: process.env.USER_SERVICE_ENDPOINT,
  changeOrigin: true,
  pathRewrite: { '^/register': '/' }
})

/**
 * routes
 */
app.use('/register', [authCheckMiddleware, proxyRegisterMiddleware])
app.use('/health', healthRoute)
app.use('/auth', authRoute)

/**
 * server
 */
app.listen(server.port, () => {
  console.log(`Listening on ${server.host}:${server.port}`)
})
