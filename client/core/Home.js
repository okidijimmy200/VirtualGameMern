import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {list} from '../game/api-game.js'
import GameDetail from '../game/GameDetail'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: '10px 24px',
  }
}))

export default function Home(){
  const classes = useStyles()
  const [games, setGames] = useState([])
  /*We will render all the games available on the platform on the home page of the
application. To implement this feature, the Home component will first fetch the list of
all the games from the game collection in the database using the list game API. */
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    list(signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setGames(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [])

  /*The updateGames method will allow the game list in the
Home component to be updated if any of the games on the list are deleted by the
maker. */
  const updateGames = (game) => {
    const updatedGames = [...games]
    const index = updatedGames.indexOf(game)
    /*update the list rendered in the Home component by
slicing the specified game from the array of games */
    updatedGames.splice(index, 1)
    /*This method will be invoked
when a user deletes their game using the EDIT and DELETE options rendered
conditionally in the GameDetail component for the maker of the game, */
    setGames(updatedGames)
  }
    return (
      <div className={classes.root}>
        {/* The list of games retrieved from the server in this useEffect hook will be set to the
state and iterated over to render a GameDetail component for each game in the list */}
        {games.map((game, i) => {
          /*The GameDetail component, which will be implemented as a reusable component
that renders details of a single game, will be passed the game details and a
updateGames method */
          return <GameDetail key={i} game={game} updateGames={updateGames}/>
        })}
      </div>
    )
}
