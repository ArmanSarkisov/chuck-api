import { Request, Response } from 'express'
import axios from 'axios'
import { currentConfig } from '../../../config'

export const joke = {
  async getJokes(req: Request, res: Response) {
    try {
      const { data: { value = [] } } = await axios.get(`${currentConfig.jokeApi}/10`)
      return res.status(200).send(value)
    } catch (err) {
      return res.status(400).send({
        message: err.message
      })
    }
  },

  async getJoke(req: Request, res: Response) {
    try {
      const { data: { value = [] } } = await axios.get(`${currentConfig.jokeApi}/1`)
      const [item] = value;
      return res.status(200).send(item)
    } catch (err) {
      return res.status(400).send({
        message: err.message
      })
    }
  }
}