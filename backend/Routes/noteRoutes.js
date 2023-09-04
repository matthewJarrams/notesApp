const express = require('express')
const Belts = require("../Models/DB");
const Notes = require('../Models/DB')
const mongoose = require("mongoose");
const { response } = require("express");
const { verifyJWT } = require('../apiCommands/userFunctions')


const {getBelts, addBelt, addStudent, makeNote, getStudent, deleteNote} = require('../apiCommands/noteFunctions')

const router = express.Router()




// //test route for getting user who is logged in
router.get('/getBelts', verifyJWT, getBelts)

router.post('/addBelt', verifyJWT, addBelt)

router.post('/addStudent', verifyJWT, addStudent);

router.post('/makeNote/:studentID', verifyJWT, makeNote)  

router.get('/:studentID', verifyJWT, getStudent)

router.delete("/deleteNote/:stuID/:id/", verifyJWT, deleteNote)





module.exports = router