/*On the frontend, we will add a corresponding fetch method in api-game.js to
make a POST request to the create game API by passing the form data collected from
the signed-in user */
const create = async (params, credentials, game) => {
    try {
      let response = await fetch('/api/games/by/'+ params.userId, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify(game)
      })
      return await response.json()
    } catch(err) { 
      console.log(err)
    }
  }
  
  /*to fetch the games using this list API, we will set up a corresponding fetch method in api-game.js */
  const list = async (signal) => {
    /*This fetch method can be used in any frontend interface to make a call to the list games API. The fetch will make a GET request to the API and receive the list of
games in the response, which can be rendered in the interface. */
    try {
      let response = await fetch('/api/games', {
        method: 'GET',
        signal: signal
      })
      return await response.json()
    } catch(err) { 
      console.log(err)
    }
  }
  
  /*frontend, to fetch the games for a specific user with this list by the maker API,
we will add a corresponding fetch method in api-game.js */
  const listByMaker = async (params, signal) => {
    try {
      /*This fetch method can be invoked in the frontend interface with the user ID to make
a call to the list games by the maker API. The */
      let response = await fetch('/api/games/by/'+params.userId, {
        method: 'GET',
        signal: signal,
      })
      return await response.json()
    } catch(err) { 
      console.log(err)
    }
  }
  
  /*We can call this API in the frontend code using a
fetch method, to retrieve the details of an individual game according to its ID. */
  const read = async (params, credentials) => {
    try {
      /*This read method will take the game ID in the params and make a GET request to the
API, using a fetch method. */
      let response = await fetch('/api/game/' + params.gameId, {
        method: 'GET'
      })
      return await response.json()
    } catch(err) { 
      console.log(err)
    }
  }
  
  /*This edit game API can be called in the frontend view using a fetch method that takes the changes as form data and sends it with the request to the backend, along
with user credentials */
  const update = async (params, credentials, game) => {
    try {
      /*This method makes the PUT request to the edit game API, providing the changes to the game in the request body, the current user's credentials in the request header, and
the ID of the game to be edited in the route URL. */
      let response = await fetch('/api/games/' + params.gameId, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        /*This method can be used in the frontend, which renders a form allowing users to update the game details. */
        body: JSON.stringify(game)
      })
      return await response.json()
    } catch(err) { 
      console.log(err)
    }
  }
  
  /*To use this API from the frontend, we will add a corresponding remove method in
api-game.js to make a fetch request to the delete game API */
  const remove = async (params, credentials) => {
    try {
      /*This method uses fetch to make a DELETE request to the delete game API. */
      let response = await fetch('/api/games/' + params.gameId, {
        /*It takes the game ID in the params and the user credentials that are needed by the API
endpoint in the backend to check if this current user is the authorized maker of the
specified game. */
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      /*If the request is successful and the corresponding game is removed
from the database, a success message is returned in the response. */
      return await response.json()
    } catch(err) { 
      console.log(err)
    }
  }
  
  export {
    create,
    list,
    listByMaker,
    read,
    update,
    remove
  }
  