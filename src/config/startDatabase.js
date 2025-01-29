import redis from 'redis'

const url = 'redis://localhost:6379'

const startDatabase = () => {
  const database = redis.createClient({ url })
  database.connect()

  database.on('connect', () => {
    console.log('Redis is ready')
  })

  database.on('error', (e) => {
    console.error('Redis error', e)
  })

  return database
}

export default startDatabase
