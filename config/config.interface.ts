export interface ConfigInterface {
  jwtSecret: string
  jwtSecretRefresh: string
  app: {
    port: string
    host: string
  }
  database: {
    mongo: {
      username: string
      password: string
      uri: string
      database: string
    }
  }
  jokeApi: string
}
