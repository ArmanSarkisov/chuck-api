import routerPromise from 'express-promise-router'
import { body } from 'express-validator'

import { favorite } from './favorite.controller'
import { checkJWTSign } from '../../middlewares/jwtCheck.middlewares'
import { validate } from '../../utils'

const router = routerPromise()

router.route('/').post(checkJWTSign, validate([
  body('jokeId').isNumeric(),
  body('joke').isString(),
  body('categories').optional().isArray()
]), favorite.create)
router.route('/my').get(checkJWTSign, favorite.getUserFavorites)
router.route('/:id').delete(checkJWTSign, favorite.removeFavorite)

export default router