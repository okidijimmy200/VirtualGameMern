import mongoose from 'mongoose'
import crypto from 'crypto'

const VRObjectSchema = new mongoose.Schema({
  objUrl: {
    type: String, trim: true,
    required: 'ObJ file is required'
  },
  mtlUrl: {
    type: String, trim: true,
    required: 'MTL file is required'
  },
  translateX: {type: Number, default: 0},
  translateY: {type: Number, default: 0},
  translateZ: {type: Number, default: 0},
  rotateX: {type: Number, default: 0},
  rotateY: {type: Number, default: 0},
  rotateZ: {type: Number, default: 0},
  scale: {type: Number, default: 1},
  color: {type: String, default: 'white'}
})
const VRObject = mongoose.model('VRObject',VRObjectSchema)


/*/*The game schema, which defines the game model with a structure for the game data,
will specify the fields to store details about each game. These details will include a
game name; a link for the game world image file, text description, or clue; arrays
containing details of 3D objects in the game, timestamps indicating when the game
was created or updated; and a reference to the user who created the game */ 
const GameSchema = new mongoose.Schema({
    /*Game name: The name field will store a title for the game. It is declared to
be a String type and will be a required field */
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  /*World image URL: The world field will contain the URL pointing to the
equirectangular image that makes up the 3D world of the game. It is
declared to be a String type and will be a required fielde */
  world: {
    type: String, trim: true,
    required: 'World image is required'
  },
  /*Clue text: The clue field will store text of String type to give a
description of the game or clues about how to complete the game */
  clue: {
    type: String,
    trim: true
  },
  /*Collectable and other VR objects: The answerObjects field will be an array containing details of the VR objects to be added to the game as
collectable objects, whereas the wrongObjects field will be an array with VR objects that cannot be collected in the game. Objects in these arrays will
be defined in a separate VR object schema */
  answerObjects: [VRObjectSchema],
  wrongObjects: [VRObjectSchema],
  /*Created at and updated at times: The created and updated fields will be
Date types, with created generated when a new game is added, and
updated changed when any game details are modified */
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  /*Game maker: The maker field will be a reference to the user who made the
game */
  maker: {type: mongoose.Schema.ObjectId, ref: 'User'}
})

GameSchema.path('answerObjects').validate(function(v) {
  if (v.length == 0) {
    this.invalidate('answerObjects', 'Must add alteast one VR object to collect')
  }
}, null)
GameSchema.path('wrongObjects').validate(function(v) {
  if (v.length == 0) {
    this.invalidate('wrongObjects', 'Must add alteast one other VR object')
  }
}, null)
export default mongoose.model('Game', GameSchema)
