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

  /*we can add a GET API that queries the Game collection with an ID and returns the corresponding game document in the response */
router.route('/api/game/:gameId')
/*We will start implementing this API to fetch a single game by declaring a route that accepts a GET request */
/*When a request is received at this route, the :gameId param in the route URL will be
processed first to retrieve the individual game from the database */
  .get(gameCtrl.read)

router.route('/api/games/:gameId')
/*PUT route that allows an authorized user to edit one of their games. */
/*A PUT request to '/api/games/:gameId' will first execute the gameByID controller method to retrieve the specific game's details */
/*The requireSignin auth controller method will also be called to ensure the current user is signed in. */
/*the isMaker controller method will determine whether the current user is the maker of this specific game, before finally running the game update controller method to modify
the game in the database */
  .put(authCtrl.requireSignin, gameCtrl.isMaker, gameCtrl.update)
  /*The flow of the controller method execution on the server, after receiving the DELETE  will be similar to the edit game API, with the final
call made to the remove controller method i */
  .delete(authCtrl.requireSignin, gameCtrl.isMaker, gameCtrl.remove)


/*In order to implement the API that will render the VR game in the browser, we will add a route in the backend that will receive a GET request and open the index.html
page from React 360 */
router.route('/game/play')
/*A GET request received at this route will execute the playGame controller method, which will return the index.html page in response to the incoming request */
  .get(gameCtrl.playGame)

  /*The presence of the :gameId param in the route will invoke the gameByID controller
method */
router.param('gameId', gameCtrl.gameByID)
/*game routes, so the user is available in the request object */
router.param('userId', userCtrl.userByID)

export default router
