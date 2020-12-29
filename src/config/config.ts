import dotenv from 'dotenv'
dotenv.config()

const server = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8888,
}

export { server }
