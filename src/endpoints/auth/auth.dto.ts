import { Request } from 'express'

export interface SignUpDto extends Request {
  username: string
  email: string
  password: string
}

export interface LoginDto extends Request {
  identifier?: string
  password: string
}

export interface RefreshTokenDto extends Request {
  refreshToken: string
}
