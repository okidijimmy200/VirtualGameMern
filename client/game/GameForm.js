import React, {useState, useEffect} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddBoxIcon from '@material-ui/icons/AddBox'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import VRObjectForm from './VRObjectForm'

import {read} from './api-game.js'

const useStyles = makeStyles(theme => ({

  card: {
    maxWidth: 1000,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
    fontSize: '1.1em'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  spacingTop: {
    marginTop: '10px'
  },
  heading: {
    width: '130px',
    padding:'10px'
  },
  objectDetails: {
    overflow: 'scroll'
  },
  imgPreview: {
    width:"300px",
    display:'block',
    margin:'auto'
  }
}))

/* The GameForm component is used in both the NewGame and EditGame components,
and it contains the elements that allow users to enter game details and VR object
details for a single game*/
////////////////////////////////////////////////////////////////
/*It may start with a blank game object or load an existing
game. To begin the implementation of this component, we will first initialize a blank
game object in the component state, */
export default function GameForm(props) {
  const classes = useStyles()
  const [readError, setReadError] = useState('')
  /*To begin the implementation of this component, we will first initialize a blank
game object in the component state */
  const [game, setGame] = useState({name: '', clue:'', world:'', answerObjects:[], wrongObjects:[]})

  /*If the GameForm component receives a gameId prop from the parent component—such as from the EditGame component—then it will use the load game
API to retrieve the game's details and set it to the state, to be rendered in the form view. */
  useEffect(() => {
    /*In the userEffect hook, we first check if the props received from the parent
component contain a gameId prop, and then use the value to make the load game
API call */
    if(props.gameId){
      const abortController = new AbortController()
      const signal = abortController.signal
    
      read({gameId: props.gameId}, signal).then((data) => {
        if (data.error) {
          /*If the API call returns an error, we set the error to the state; */
          setReadError(data.error)
        } else {
          /*we set the retrieved game to the state. */
          setGame(data)
        }
      })
      return function cleanup(){
        abortController.abort()
      }
    }
  }, [])

  /*This handleChange method will update the game values in the state whenever a user
changes a value in an input element */
  const handleChange = name => event => {
    /*based on the specific field value being changed, we update the
corresponding attribute in the game object in the state. This captures the values
entered by the user as simple details for their VR game */
    const newGame = {...game}
    newGame[name] = event.target.value
    setGame(newGame)
  }
  const addObject = name => event => {
    const newGame = {...game}
    newGame[name].push({})
    setGame(newGame)
  }
  const handleObjectChange = (index, type, name, val) => {
    var newGame = {...game}
    newGame[type][index][name] = val
    setGame(newGame)
  }

  const removeObject = (type, index) => event => {
    const newGame = {...game}
    newGame[type].splice(index, 1)
    setGame(newGame)
  }
    return (
      /*The form view part in the GameForm component will essentially have two parts: one
part that takes simple game details—such as name, world image link, and clue
text—as input, and a second part that allows users to add a variable number of VR
objects to either the answer objects array or the wrong objects array. */
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            {/* Form title: The form title will be either New Game or Edit Game, depending on whether an existing game ID is passed as a prop to
GameForm from the parent component to which it is added, */}
            {props.gameId? 'Edit': 'New'} Game
          </Typography>
          {/* Game world image input: We will render the background image URL in an img element at the very top of the form to show users the image they
added as the game world image URL. The image URL input will be taken in a TextField component below the rendered image */}
          <img src={game.world} className={classes.imgPreview}/>
          <TextField id="world" label="Game World Equirectangular Image (URL)" className={classes.textField} value={game.world} onChange={handleChange('world')} margin="normal"/><br/>
          {/* Game name: The game name will be added in a single TextField of the default text type */}
          <TextField id="name" label="Name" className={classes.textField} value={game.name} onChange={handleChange('name')} margin="normal"/><br/>
          {/* Clue text: The clue text will be added to a multiline TextField component, */}
          <TextField id="multiline-flexible" label="Clue Text" multiline rows="2" value={game.clue} onChange={handleChange('clue')} className={classes.textField} margin="normal"/><br/>
          {/* In these form elements added to the GameForm component, the input fields also take an onChange handler function, which is defined as handleChange */}
          <Divider className={classes.spacingTop}/>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>VR Objects to collect</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.objectDetails}>
              {
                game.answerObjects.map((item, i) => {
                  return <div key={i}>
                    <VRObjectForm handleUpdate={handleObjectChange} index={i} type={'answerObjects'} vrObject={item} removeObject={removeObject}/>
                  </div>
                })
              }
              <Button color="primary" variant="contained" onClick={addObject('answerObjects')}><AddBoxIcon color="secondary" style={{marginRight: '8px'}}/> Add Object</Button>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Other VR objects</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {
                game.wrongObjects.map((item, i) => {
                  return <div key={i}>
                    <VRObjectForm handleUpdate={handleObjectChange} index={i} type={'wrongObjects'} vrObject={item} removeObject={removeObject}/>
                  </div>
                })
              }
              <Button color="primary" variant="contained" onClick={addObject('wrongObjects')}><AddBoxIcon color="secondary" style={{marginRight: '8px'}}/> Add Object</Button>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          {
            (props.errorMsg || readError)
            && (<Typography component="p" color="error">
                  <Icon color="error" className={classes.error}>error</Icon>
                  {props.errorMsg || readError }
               </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={props.onSubmit(game)} className={classes.submit}>Submit</Button>
          <Link to='/' className={classes.submit}>
            <Button variant="contained">Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    )

}

GameForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errorMsg: PropTypes.string,
  gameId: PropTypes.string
}
