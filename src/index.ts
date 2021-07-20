import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan';

import { json, urlencoded } from 'body-parser'

// routes
import { routes } from './routes'
import connectMongo from './setups/mongoose'

connectMongo()
// init app
const app: Application = express()

app.use(cors())

app.use(json())

app.use(urlencoded({ extended: true }))

app.use(morgan('combined'));

routes.forEach((item: string) => {
  app.use(`/api/v1/${item}`, async (...args) => {
    const route = await import(`./endpoints/${item}/${item}.routes.ts`)

    return route.default(...args)
  })
})


export default app
