import { Response } from 'express'
import { compare, hash } from 'bcrypt'
import { sign, verify, JsonWebTokenError } from 'jsonwebtoken'

// config
import { currentConfig } from '../../../config'

// dto
import { SignUpDto, LoginDto, RefreshTokenDto } from './auth.dto'

// models
import { TokenModel, User } from '../../models'

export const auth = {
  async signUp({ body }: SignUpDto, res: Response) {
    try {
      const foundUser = await User.findOne({ $or: [{ email: body.email }, { username: body.username }] })

      if (foundUser) {
        return res.status(409).send({
          message: 'User email or username already exist'
        })
      }

      const hashedPassword = await hash(body.password, 10)

      const createdUser = new User({
        ...body,
        password: hashedPassword
      })
      await createdUser.save()
      return res.status(200).send({
        message: 'User created'
      })
    } catch (err) {
      return res.status(400).send({
        message: err.message
      })
    }
  },

  async login({ body: { identifier, password } }: LoginDto, res: Response) {
    try {
      const foundUser = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] })

      if (!foundUser) {
        return res.status(404).send({
          message: 'Email/Username or password incorrect'
        })
      }

      const isMatch = await compare(password, foundUser.password)

      if (!isMatch) {
        return res.status(404).send({
          message: 'Email/Username or password incorrect'
        })
      }

      const accessToken = sign({
        userId: foundUser._id,
        email: foundUser.email
      }, currentConfig.jwtSecret, { expiresIn: '1d' })

      const refreshToken = sign({
        userId: foundUser._id,
        email: foundUser.email
      }, currentConfig.jwtSecretRefresh, { expiresIn: '30d' })

      const foundToken = await TokenModel.findOne({ user: foundUser._id })

      const user = await User.findById(foundUser._id).select('-password')

      if (foundToken) {
        await TokenModel.findByIdAndUpdate(foundToken._id, { token: refreshToken })
        return res.status(200).send({
          accessToken,
          refreshToken,
          user
        })
      }

      const token = new TokenModel({ token: refreshToken, user: user._id })
      await token.save()

      return res.status(200).send({
        accessToken,
        refreshToken,
        user
      })
    } catch (err) {
      return res.status(400).send({
        message: err.message
      })
    }
  },

  async logOut({ body: { refreshToken } }: RefreshTokenDto, res: Response) {
    try {
      const foundToken = await TokenModel.findOne({ token: refreshToken })

      if (!foundToken) {
        return res.status(403).send({
          message: 'Forbidden'
        })
      }

      await TokenModel.findByIdAndDelete(foundToken._id)

      return res.status(200).send({
        message: 'Success'
      })
    } catch (err) {
      return res.status(400).send({
        message: err.message
      })
    }
  },

  async refreshToken({ body: { refreshToken } }: RefreshTokenDto, res: Response) {
    if (!refreshToken) {
      return res.status(403).send({
        message: 'Forbidden'
      })
    }

    const foundToken = await TokenModel.findOne({ token: refreshToken })

    if (!foundToken) {
      return res.status(401).send({
        message: 'Not authorized'
      })
    }

    const foundUser = await User.findById(foundToken.user).select('-password')

    verify(
      refreshToken,
      currentConfig.jwtSecretRefresh,
      (err: JsonWebTokenError) => {
        if (err) {
          return res.status(401).send({
            message: 'Not authorized'
          })
        }

        const accessToken = sign({
          userId: foundUser._id,
          email: foundUser.email
        }, currentConfig.jwtSecret, { expiresIn: '1d' })

        return res.status(200).send({
          accessToken,
          user: foundUser
        })
      }
    )
  }
}