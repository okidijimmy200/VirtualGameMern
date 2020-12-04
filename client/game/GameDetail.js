import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import DeleteGame from './DeleteGame'

const useStyles = makeStyles(theme => ({
  card: {
    width: 600,
    margin: theme.spacing(2),
    display: 'inline-table',
    textAlign: 'center'
  },
  heading: {
    position: 'relative'
  },
  title: {
    position: 'absolute',
    padding: '16px 40px 16px 40px',
    fontSize: '1.15em',
    backgroundColor: '#6f6f6fcf',
    color: '#cddd39',
    left: '-5px',
    top: '14px'
  },
  maker: {
    position: 'absolute',
    top: '-44px',
    right: '0px',
    fontSize: '0.95em',
    fontWeight: '300',
    backgroundColor: '#cddd3985',
    color: 'white',
    padding: '12px 16px'
  },
  media: {
    height: 250
  },
  action: {
    padding: 0
  },
  button: {
    width: '100%',
    height: '42px',
    fontSize: '1em',
    letterSpacing: '2px'
  },
  editbutton: {
    width: '50%',
    margin: 'auto'
  },
  clue: {
    padding: '7px',
    backgroundColor: '#e8eae3'
  }
}))
export default function GameDetail(props) {
  const classes = useStyles()
    return (<Card className={classes.card}>
      <div className={classes.heading}>
        {/* we will first add the game details—such as the name, world image, clue text, and maker name—to give users an
overview of the game. We will use Material-UI components to compose the interface
with these details, */}
        <Typography type="headline" component="h2" className={classes.title}>
          {props.game.name}
        </Typography>
      </div>
      <CardMedia className={classes.media} image={props.game.world} title={props.game.name}/>
      <div className={classes.heading}>
        <Typography type="subheading" component="h4" className={classes.maker}>
          <em>by</em>
          {props.game.maker.name}
        </Typography>
      </div>
      <CardContent className={classes.clue}>
        <Typography type="body1" component="p">
          {props.game.clue}
        </Typography>
      </CardContent>
      <div className={classes.action}>
        {/* The PLAY GAME button rendered in the GameDetail component will simply be a
button wrapped in an HTML link element that points to the route that opens the
React 360-generated index.html file */}
        <a href={"/game/play?id=" + props.game._id} target='_self'>
          {/* The route to the game view takes the game ID as a query parameter. We set
target='_self' on the link so React Router skips transitioning to the next state and
lets the browser handle this link */}
{/* ------------------------------------------------------------------------ */}
{/* What this will do is allow the browser to directly make the request to the server at this route when the link is clicked, and render the
index.html file sent by the server in response to this request, allowing the user to start playing the rendered VR game immediately. */}
          <Button variant="contained" color="secondary" className={classes.button}>
            Play Game
          </Button>
        </a>
      </div>
      {
        /*we will conditionally show EDIT and DELETE options only if the currently signed-in user is also the maker of the
game being rendered. */
        auth.isAuthenticated().user && auth.isAuthenticated().user._id == props.game.maker._id
        && (<div>
          {/* After ensuring the current user is actually authenticated, we check if the user ID of
the signed-in user matches the maker ID in the game. Then, accordingly, we render
the EDIT button linking to the edit form view, and the DELETE option with
a DeleteGame component */}
              <Link to={"/game/edit/" + props.game._id}>
                <Button variant="contained" color="primary" className={classes.editbutton}>
                  Edit
                </Button>
              </Link>
              <DeleteGame game={props.game} removeGame={props.updateGames}/>
            </div>)
      }
    </Card>)

}
GameDetail.propTypes = {
  game: PropTypes.object.isRequired,
  updateGames: PropTypes.func.isRequired
}


