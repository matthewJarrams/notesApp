const express = require('express')
// const upload = require("../utils/multer.js");

const {registerUser, loginUser, verifyJWT, getProfile, getSenseis, updateSensei} = require('../apiCommands/userFunctions')

const router = express.Router()


/*
    register and login routes
*/
router.post('/register',registerUser)

router.post('/login', loginUser)

router.get('/getUsers', verifyJWT, getSenseis);

router.patch('/updateUser/:id', verifyJWT, updateSensei)


// test route for getting user who is logged in
router.get('/getUser', verifyJWT, getProfile, (req, res) =>{
    console.log("I have made it back here :)")
    res.send("Welcome")
})













module.exports = router