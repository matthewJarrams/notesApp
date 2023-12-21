const express = require('express')
const Belts = require("../Models/DB");
const Notes = require('../Models/DB')
const mongoose = require("mongoose");
const { response } = require("express");
const { verifyJWT } = require('../apiCommands/userFunctions')


const {getBelts, addBelt, addStudent, makeNote, getStudent, deleteNote, getStudents, updateStudent, addBadge, getBadges, getTodayStudents, getRecentNotes, getStudentByName} = require('../apiCommands/noteFunctions')

const router = express.Router()




// //test route for getting user who is logged in
router.get('/todayStudents', verifyJWT, getTodayStudents);

router.get('/recentNotes', getRecentNotes);

router.get('/getBelts',verifyJWT, getBelts);

router.get('/getBadges', verifyJWT, getBadges);

router.get('/allStudents', verifyJWT, getStudents);

router.post('/addBelt', verifyJWT, addBelt);

router.post('/addStudent', verifyJWT, addStudent);

router.post('/makeNote/:studentID', verifyJWT, makeNote);

router.post('/addBadge', verifyJWT, addBadge);

router.get('/getStudentByName/:studentName', getStudentByName);


router.get('/:studentID', verifyJWT, getStudent);

router.delete("/deleteNote/:stuID/:id", verifyJWT, deleteNote);

router.patch("/updateStudent/:id", verifyJWT, updateStudent);







module.exports = router