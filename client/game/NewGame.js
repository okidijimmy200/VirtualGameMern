import React, {useState} from 'react'
import auth from './../auth/auth-helper'
import PropTypes from 'prop-types'
import {create} from './api-game.js'
import {Redirect} from 'react-router-dom'
import GameForm from './GameForm'

export default function NewGame(){
  const [redirect, setRedirect] = useState(false)
  const [error, setError]= useState('')
  /*The clickSubmit method passed in this case is defined in the NewGame
component. */
  const clickSubmit = game => event => {
    const jwt = auth.isAuthenticated()
    /*It uses the create game fetch method from api-game.js to make a
POST request to the create game API with the game form data and user details. */
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, game).then((data) => {
      /*If the user makes an error while entering the game details in the form, the backend
sends back an error message when this clickSubmit method is called on form
submission */
      if (data.error) {
        setError(data.error)
      } else {
        /*If there are no errors and the game is successfully created in the database,
the user is redirected to another view. */
        setError('')
        setRedirect(true)
      }
    })
  }
  if (redirect) {
    /*The NewGame component will use the GameForm component, which will contain all the rendered form fields, to compose this new game form. The GameForm component
will be a reusable component that we will use in both the create and edit forms */
    return (<Redirect to={'/user/'+auth.isAuthenticated().user._id}/>)
  }
  return (
    /*When added to the NewGame component, it takes an onSubmit method as a prop,
along with any server-returned error messages */
/*The method passed in the onSubmit prop will be executed when the user submits the
form. */
    <GameForm onSubmit={clickSubmit} errorMsg={error}/>
  )
}

