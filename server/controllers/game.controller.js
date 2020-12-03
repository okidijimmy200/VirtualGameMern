import Game from '../models/game.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'

/*Once the user authentication is verified after receiving the POST request containing
the game data in the body, the create controller method is invoked next, to add the
new game to the database. */
const create = async (req, res, next) => {
  /*a new game document is created according to the game model and the data passed in the request body from the client side */
  const game = new Game(req.body)
  game.maker= req.profile
  try{
    /*this document is saved in the Game collection after the user reference is set as the game
maker. */
    let result = await game.save()
    res.status(200).json(result)
  } catch (err) {
    return res.status(400).json({
    error: errorHandler.getErrorMessage(err)
    })
  }
}

/*method, the results retrieved by the query to the Game collection are sorted by
the date of creation, with the latest games listed first. */
const list = async (req, res) => {
  try {
    /*Each game in the list will also populate the name and ID of the user who created it. */
    let games = await Game.find({}).populate('maker', '_id name').sort('-created').exec()
    /*The resulting list of sorted games is returned in the response to the requesting client. */
    res.json(games)
  } catch (err) {
    return res.status(400).json({
    error: errorHandler.getErrorMessage(err)
    })
  }
}

/*In the query to the Game collection in this method, we find all the games where the maker field matches the user specified in the userId route parameter. */
const listByMaker = async (req, res) => {
  try {
    /*The retrieved games will contain the maker name and ID and will be returned in the response to the
requesting client. */
    let games = await Game.find({maker: req.profile._id}).populate('maker', '_id name')
    res.json(games)
  } catch (err) {
    return res.status(400).json({
     error: errorHandler.getErrorMessage(err)
    })
  }
}

const gameByID = async (req, res, next, id) => {
  try { 
    let game = await Game.findById(id).populate('maker', '_id name').exec()
    if (!game)
      return res.status('400').json({
        error: "Game not found"
      })
    req.game = game
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve game"
    })
  }
}

const read = (req, res) => {
  return res.json(req.game)
}

const update = async (req, res) => {
  try {
  let game = req.game
  game = extend(game, req.body)
  game.updated = Date.now()
  await game.save()
    res.json(game)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    let game = req.game
    let deletedGame = await game.remove()
    res.json(deletedGame)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const isMaker = (req, res, next) => {
  let isMaker = req.game && req.auth && req.game.maker._id == req.auth._id
  if(!isMaker){
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

const playGame = (req, res) => {
  res.sendFile(process.cwd()+'/server/vr/index.html')
}

export default {
  create,
  list,
  listByMaker,
  gameByID,
  read,
  update,
  remove,
  isMaker,
  playGame
}
