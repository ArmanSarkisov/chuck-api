import { Request, Response, NextFunction } from 'express'
import { verify, decode } from 'jsonwebtoken'
import { TokenType } from '../types/token.type'

import { currentConfig } from '../../config'

export const checkJWTSign = async (req: Request, res: Response, next: NextFunction) => {
  const { jwtSecret } = currentConfig

  const {
    headers: { authorization }
  } = req

  if (authorization) {
    const token = authorization.split(' ')[1]

    verify(token, jwtSecret, err => {
      if (err) {
        res.sendStatus(401)
        return next()
      }
    })
    const tokenInfo = await decode(token) as TokenType
    req.userInfo = tokenInfo

    return next()
  }

  return res.sendStatus(403)
}

