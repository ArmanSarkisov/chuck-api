import { Request, Response } from 'express'

// models
import { Favorite, User } from '../../models'
import { CreateFavoriteDto } from './favorites.dto'

export const favorite = {
  async create({ body, userInfo }: CreateFavoriteDto, res: Response) {
    try {
      const foundUser = await User.findById(userInfo.userId)
      const foundFavorite = await Favorite.findOne({ jokeId: body.jokeId })

      if (!foundUser) {
        return res.status(403).send({
          message: 'Forbidden'
        })
      }

      if (foundFavorite) {
        return res.status(409).send({
          message: 'This joke is already in favorite'
        })
      }

      if (foundUser.favorites.length >= 10) {
        return res.status(409).send({
          message: 'You can add only 10 favorite item'
        })
      }

      const createdFavorite = new Favorite({ ...body, user: userInfo.userId })

      await createdFavorite.save()

      await User.findByIdAndUpdate(userInfo.userId, { $push: { favorites: createdFavorite._id } })

      return res.status(200).send(createdFavorite)
    } catch (err) {
      return res.status(400).send({
        message: err.message
      })
    }
  },

  async getUserFavorites({ userInfo }: Request, res: Response) {
    try {
      const foundUserFavorites = await Favorite.find({ user: userInfo.userId })

      return res.status(200).send(foundUserFavorites)
    } catch (err) {
      return res.status(400).send({
        message: err.message
      })
    }
  },

  async removeFavorite({ params: { id } }: Request, res: Response) {
    try {
      const deletedFavorite = await Favorite.findOneAndDelete({ jokeId: id })

      await User.findByIdAndUpdate(deletedFavorite.user, { $pull: { favorites: deletedFavorite._id } })

      const foundUserFavorites = await Favorite.find({ user: deletedFavorite.user })

      return res.status(200).send(foundUserFavorites)
    } catch (err) {
      return res.status(400).send({
        message: err.message
      })
    }
  }
}