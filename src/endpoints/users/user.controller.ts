import { Request, Response } from 'express'

// models
import { User } from '../../models'

interface GetUserByIdDto extends Request {
  params: {
    id: string
  }
}

export const user = {
  async getUser({ params: { id } }: GetUserByIdDto, res: Response) {
    try {
      const foundUser = await User.findById(id).populate('favorites').select('-password')

      return res.status(200).send(foundUser)
    } catch (err) {
      return res.status(400).send({
        message: err.message
      })
    }
  },

  async getMe({ userInfo }: Request, res: Response) {
    try {
      const foundUser = await User.findById(userInfo.userId).populate('favorites').select('-password')

      if (!foundUser) {
        return res.status(404).send({
          message: 'User not found'
        })
      }

      return res.status(200).send(foundUser)
    } catch (err) {
      return res.status(400).send({
        message: err.message
      })
    }
  }
}