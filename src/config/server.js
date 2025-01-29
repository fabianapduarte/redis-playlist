import express from 'express'
import startDatabase from './startDatabase.js'
import routes from './routes.js'

export const server = express()
server.use(express.json())
server.use(routes)

export const database = startDatabase()
