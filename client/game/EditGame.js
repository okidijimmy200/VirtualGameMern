import React, {useState} from 'react'
import auth from './../auth/auth-helper'
import {update} from './api-game.js'
import {Redirect} from 'react-router-dom'
import GameForm from './GameForm'

/*Just as in the NewGame component, the EditGame component will also use the GameForm component to render the form elements. But in this form, the fields will
load the current values of the game to be edited, and users will be able to update these values, */
export default function EditGame({ match }) {
  const [redirect, setRedirect] = useState(false)
  const [error, setError]= useState('')

  /*The clickSubmit method for the edit form will use the update game fetch method
in api-game.js to make a PUT request to the edit game API with the form data and
user details */
  const clickSubmit = game => event => {
    const jwt = auth.isAuthenticated()
    update({
      gameId: match.params.gameId
    }, {
      t: jwt.token
    }, game).then((data) => {
      /*If the user makes an error while modifying the game details in the form, the backend
sends back an error message when this clickSubmit method is called on form
submission */
      if (data.error) {
        setError(data.error)
      } else {
        /*If there are no errors and the game is successfully updated in the
database, the user is redirected to another view. */
        setError('')
        setRedirect(true)
      }
    })
  }

    if (redirect) {
      return (<Redirect to={'/user/'+auth.isAuthenticated().user._id}/>)
    }
    return (
      /*In the case of this EditGame component, the GameForm will take the given game's ID
as a prop so that it can fetch the game details, in addition to the onSubmit method
and server-generated error message, if any */
      <GameForm gameId={match.params.gameId} onSubmit={clickSubmit} errorMsg={error}/>
    )

}

