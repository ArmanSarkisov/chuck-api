import dotEnv from 'dotenv'
import { ConfigInterface } from './config.interface'

dotEnv.config()

const config: ConfigInterface = {
  database: {
    mongo: {
      username: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      uri: process.env.MONGO_URI,
      database: process.env.MONGO_DB
    }
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtSecretRefresh: process.env.JWT_SECRET_REFRESH,
  app: {
    port: process.env.PORT,
    host: process.env.HOST
  },
  jokeApi: process.env.JOKE_API
}

export default config;
