import routerPromise from 'express-promise-router'
import { body } from 'express-validator'

import { auth } from './auth.controller'
import { validate } from '../../utils'
import { checkJWTSign } from '../../middlewares/jwtCheck.middlewares'

const router = routerPromise()

router.route('/sign-up').post(validate([
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 32 }),
  body('username').isString().isLength({ min: 2, max: 32 })
]), auth.signUp)

router.route('/login').post(validate([
  body('identifier').isString(),
  body('password').isLength({ min: 6, max: 32 }),
]), auth.login)
router.route('/logout').post(validate([
  body('refreshToken').isJWT()
]), checkJWTSign, auth.logOut)
router.route('/refresh-token').post(validate([
  body('refreshToken').isJWT()
]), auth.refreshToken)

export default router