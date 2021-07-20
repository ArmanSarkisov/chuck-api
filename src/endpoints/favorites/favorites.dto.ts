import { Request } from 'express'

export interface CreateFavoriteDto extends Request {
  user: string
  jokeId: number
  joke: string
  categories?: string[]
}