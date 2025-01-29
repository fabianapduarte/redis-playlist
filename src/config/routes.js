import express from 'express'
import { addMusic, getRanking, playMusic } from '../controllers/musicController.js'

const routes = express.Router()

routes.post('/musics', addMusic)
routes.get('/ranking', getRanking)
routes.post('/play/:musicId', playMusic)

export default routes
