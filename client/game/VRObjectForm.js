import React, {useEffect, useState} from 'react'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  card: {
    marginRight:'12px',
    marginLeft: '12px',
    padding: '10px'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  numberField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 70
  }
}))

export default function VRObjectForm(props) {
  const classes = useStyles()
  /*To begin implementation of this VRObjectForm component containing a VR object form, we will start by initializing the blank details of a VR object in the component's
state with a useState hook, */
  const [values, setValues] = useState({
    /*These details correspond to the schema defined for storing a VR object */
    objUrl: '',
    mtlUrl: '',
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    color:'white'
  })
  /*When a VRObjectForm component is added to the GameForm component, it may receive an empty VR object or a VR object populated with details, depending on whether an
empty form or a form with details of an existing object is being rendered. */
////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*In the casethat an existing VR object is passed as a prop, we will set the details of this object in
the component state using an useEffect hook, */
  useEffect(() => {
    /*In this useEffect hook, if the vrObject value passed in the prop is not an empty
object, we set the details of the received VR object in the state */
    if(props.vrObject && Object.keys(props.vrObject).length != 0){
      /*These values will be
used in the input fields that make up the VR object form. */
      const vrObject = props.vrObject
      setValues({...values,
        objUrl: vrObject.objUrl,
        mtlUrl: vrObject.mtlUrl,
        translateX: Number(vrObject.translateX),
        translateY: Number(vrObject.translateY),
        translateZ: Number(vrObject.translateZ),
        rotateX: Number(vrObject.rotateX),
        rotateY: Number(vrObject.rotateY),
        rotateZ: Number(vrObject.rotateZ),
        scale: Number(vrObject.scale),
        color:vrObject.color
      })
    }
  }, [])
  /*This handleChange method will update the corresponding value in the state of the VRObjectForm component, and use the handleUpdate method passed as a prop
from GameForm to update the VR object in the GameForm state with the changed value for the specific object detail. */
  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value})
    props.handleUpdate(props.index, props.type, name, event.target.value)
  }
    return (
      <Card className={classes.card}>
        {/* 3D object file input: The OBJ and MTL file links will be collected for each
VR object as text input using the TextField components */}
        <TextField
          label=".obj url"
          value={values.objUrl}
          /*These input fields will allow the user to set the details of a VR object in a game. When
any of these VR object details are changed in these input fields by the user, the
handleChange method will be invoked */
          onChange={handleChange('objUrl')}
          className={classes.textField}
          margin="normal"
        /><br/>
        <TextField
          label=".mtl url"
          value={values.mtlUrl}
          onChange={handleChange('mtlUrl')}
          className={classes.textField}
          margin="normal"
        /><br/>
        {/* Translate value input: The translate values of the VR object across the x, y,
and z axes will be input in the TextField components of the number type */}
        <TextField
          value={values.translateX}
          label="TranslateX"
          onChange={handleChange('translateX')}
          type="number"
          className={classes.numberField}
          margin="normal"
        />
        <TextField
          value={values.translateY}
          label="TranslateY"
          onChange={handleChange( 'translateY')}
          type="number"
          className={classes.numberField}
          margin="normal"
        />
        <TextField
          value={values.translateZ}
          label="TranslateZ"
          onChange={handleChange('translateZ')}
          type="number"
          className={classes.numberField}
          margin="normal"
        /><br/>
        {/* Rotate value input: The rotation values of the VR object around the x, y,
and z axes will be input in the TextField components of the number type */}
        <TextField
          value={values.rotateX}
          label="RotateX"
          onChange={handleChange('rotateX')}
          type="number"
          className={classes.numberField}
          margin="normal"
        />
        <TextField
          value={values.rotateY}
          label="RotateY"
          onChange={handleChange('rotateY')}
          type="number"
          className={classes.numberField}
          margin="normal"
        />
        <TextField
          value={values.rotateZ}
          label="RotateZ"
          onChange={handleChange('rotateZ')}
          type="number"
          className={classes.numberField}
          margin="normal"
        /><br/>
        {/* Scale value input: The scale value for the VR object will be input in a
TextField component of the number type */}
        <TextField
          value={values.scale}
          label="Scale"
          onChange={handleChange('scale')}
          type="number"
          className={classes.numberField}
          margin="normal"
        />
        {/* Object color input: The color value for the VR object will be input in a
TextField component of the text */}
        <TextField
          value={values.color}
          label="Color"
          onChange={handleChange('color')}
          className={classes.numberField}
          margin="normal"
        />
        {/* The VRObjectForm will also contain a DELETE button that will execute the removeObject method received in the GameForm as a prop, which will allow the
given object to be removed from the list in the game. */}
        <Button onClick={props.removeObject(props.type, props.index)}>
          <Icon style={{marginRight: '5px'}}>cancel</Icon> Delete
        </Button><br/>
     </Card>
     )
}

VRObjectForm.propTypes = {
  index: PropTypes.number.isRequired,
  vrObject: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  removeObject: PropTypes.func.isRequired
}

