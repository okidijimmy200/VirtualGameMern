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
  
  const read = async (params, credentials) => {
    try {
      let response = await fetch('/api/game/' + params.gameId, {
        method: 'GET'
      })
      return await response.json()
    } catch(err) { 
      console.log(err)
    }
  }
  
  const update = async (params, credentials, game) => {
    try {
      let response = await fetch('/api/games/' + params.gameId, {
        method: 'PUT',
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
  
  const remove = async (params, credentials) => {
    try {
      let response = await fetch('/api/games/' + params.gameId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
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
  