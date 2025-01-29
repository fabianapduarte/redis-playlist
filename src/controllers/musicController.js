import { v4 as uuid } from 'uuid'
import { database } from '../config/server.js'

export const addMusic = async (req, res) => {
  try {
    const { title, artist, album } = req.body

    if (!title || !artist || !album) {
      res.status(400).json({ message: 'Dados incompletos' })
    } else {
      const id = uuid()
      await database.hSet(`music:${id}`, { title, artist, album })
      const music = await database.hGetAll(`music:${id}`)

      res.status(201).json({ id, ...music })
    }
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}

export const getRanking = async (_, res) => {
  try {
    const rankingData = await database.sendCommand(['ZREVRANGE', 'musics:ranking', '0', '9', 'WITHSCORES'])

    const rankingWithScores = []
    for (let i = 0; i < rankingData.length; i += 2) {
      rankingWithScores.push({
        key: rankingData[i],
        score: parseInt(rankingData[i + 1]),
      })
    }

    const ranking = await Promise.all(
      rankingWithScores.map(async ({ key, score }) => {
        const music = await database.hGetAll(key)
        return {
          ...music,
          score,
        }
      }),
    )

    res.json(ranking)
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}

const checkIfMusicExists = async (id) => {
  const music = await database.hGetAll(`music:${id}`)
  const isEmpty = Object.keys(music).length === 0

  return !isEmpty
}

export const playMusic = async (req, res) => {
  try {
    const { musicId } = req.params

    const musicExists = await checkIfMusicExists(musicId)

    if (musicExists) {
      await database.zIncrBy('musics:ranking', 1, `music:${musicId}`)

      const timestamp = new Date()
      const data = {
        musicId: `music:${musicId}`,
        timestamp: timestamp.toISOString(),
      }
      await database.xAdd('playlist', '*', data)

      res.status(200).end()
    } else {
      res.status(404).json({ message: 'Música não encontrada' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}
