import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import gameCtrl from '../controllers/game.controller'

const router = express.Router()

/*adding a GET route to the game routes, */
router.route('/api/games')
/*A GET request to /api/games will execute the list controller method, which will query the Game collection in the database, to return all the games in the response to
the client */
  .get(gameCtrl.list)

  /*we will first declare a POST route at /api/games/by/:userId */
  /*After a request is received by this create game API, to process the :userId param and retrieve the associated user from the database we will utilize
the userByID method from the user controller */
router.route('/api/games/by/:userId')
/*A POST request to this route will process the :userId param, verify that the current user is signed in, and then create a new game with the game data passed in the
request */
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, gameCtrl.create)
  /*A GET request received at this route will invoke the listByMaker controller method,
which will query the Game collection in the database to get the matching games */
  .get(gameCtrl.listByMaker)

router.route('/api/game/:gameId')
  .get(gameCtrl.read)

router.route('/api/games/:gameId')
  .put(authCtrl.requireSignin, gameCtrl.isMaker, gameCtrl.update)
  .delete(authCtrl.requireSignin, gameCtrl.isMaker, gameCtrl.remove)

router.route('/game/play')
  .get(gameCtrl.playGame)

router.param('gameId', gameCtrl.gameByID)
/*game routes, so the user is available in the request object */
router.param('userId', userCtrl.userByID)

export default router
