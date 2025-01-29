import { commandOptions } from 'redis'
import startDatabase from './config/startDatabase.js'

export const database = startDatabase()

let currentId = '0-0'

while (true) {
  try {
    const result = await database.xRead(
      commandOptions({
        isolated: true,
      }),
      [
        {
          key: 'playlist',
          id: currentId,
        },
      ],
      {
        COUNT: 1,
        BLOCK: 5000,
      },
    )

    if (result) {
      currentId = result[0].messages[0].id

      const { musicId } = result[0].messages[0].message
      const music = await database.hGetAll(musicId)

      console.log(`Música atual: ${music.title}`)
      console.log(`Artista: ${music.artist}`)
      console.log(`Álbum: ${music.album}`)
      console.log('----------------------------------------------')
    } else {
      console.log('Nenhuma música na lista.')
      console.log('----------------------------------------------')
    }
  } catch (error) {
    console.error(error)
  }
}
