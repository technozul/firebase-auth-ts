import { server } from './config/config'
import express, { Application, Router } from 'express'
// import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import homeRoute from './routes/home'
import authRoute from './routes/auth'

const app: Application = express()

/**
 * middlewares
 */
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded())

/**
 * routes
 */
app.get('/', homeRoute)
app.use('/auth', authRoute)

/**
 * server
 */
app.listen(server.port, () => {
  console.log(`Listening on ${server.host}:${server.port}`)
})
