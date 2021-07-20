import routerPromise from 'express-promise-router'
import { user } from './user.controller'
import { checkJWTSign } from '../../middlewares/jwtCheck.middlewares'

const router = routerPromise()

router.route('/me').get(checkJWTSign, user.getMe)
router.route('/:id').get(user.getUser)

export default router