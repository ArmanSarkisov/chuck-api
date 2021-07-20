import routerPromise from 'express-promise-router'

import { joke } from './joke.controller'

const router = routerPromise()

router.route('/one').get(joke.getJoke)
router.route('/').get(joke.getJokes)

export default router