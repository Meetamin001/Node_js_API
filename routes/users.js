const express = require('express');
const router = express.Router();
const Users = require('../models/user')

//get all users
router.get('/', async (req, res) => {
  
  const users = await Users.find()

  try{
    res.send(users)
  } 
  catch(err) {
    res.status(500).json({message: err.message})
  }
})

//get one user
router.get('/:id', getUserById, async (req, res) => {
  res.json(res.user)
})

//post user
router.post('/', async (req, res) => {

  // create new user from data came from body
  const user = new Users({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    permissionLevel: req.body.permissionLevel
  })

  try{
    const newUser = await user.save()
    res.status(201).json(newUser)
  } 
  catch(err) {
    res.status(400).json({message: err.message})
  }
  
})

//update user
router.patch('/:id', getUserById, async (req, res) => {
  if(req.body.firstName != null){
    res.user.firstName = req.body.firstName
  }
  if(req.body.lastName != null){
    res.user.lastName = req.body.lastName
  }
  if(req.body.email != null){
    res.user.email = req.body.email
  }
  if(req.body.password != null){
    res.user.password = req.body.password
  }
  if(req.body.permissionLevel != null){
    res.user.permissionLevel = req.body.permissionLevel
  }

  try{
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  }
  catch(err){
    res.status(400).json({message: err.message})
  }
})

//delete user
router.delete('/:id', getUserById , async (req, res) => {

  try{
    await res.user.remove()
    res.json({message: " User has been Deleted!"})
  }
  catch{
    res.status(500).json({message: err.message})
  }
})

//create middleware function to get specific user
async function getUserById(req,res,next) {
  let user;

  try{
    user = await Users.findById(req.params.id)
    if(user == null){
      return res.status(404).json({message: "Cannot find user"})
    }
  }
  catch(err){
    return res.status(500).json({message: err.message})
  }

  res.user = user
  next()
}

module.exports = router