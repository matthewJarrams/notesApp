require("dotenv").config();
const db = require("../Models/DB");
const mongoose = require("mongoose");
const { response } = require("express");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const { Promise } = require("mongodb");
const { log } = require("console");

//User registration
const registerUser = async (req, res) => {
  //there are the fields needed to register a user
  //create a form with these fields for frontend
  console.log(req.body);
  let { username, name, password } = req.body;

  const userInDb = await db.Sensei.findOne({ username: username });


  //email and username must be unique
  if (userInDb != null) {
    res.json({ validReg: false });
    console.log("Caught");

  } else {
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    console.log(password);

    const newUser = new db.Sensei({
      name: name,
      username: username,
      password: req.body.password,
      active: true,
    });

    newUser.save();
    // res.json(newUser);
    res.json({ validReg: true });
  }
};

//For login page checks for valid credentials then creates a JWT
//JWT is sent back and will need to be put in local storage to be used on all pages
const loginUser = async (req, res) => {
    //use username and password to login
    const { username, password } = req.body;
    console.log(username, password);

    const loginAttempt = await db.Sensei.findOne({username: username});
    console.log(loginAttempt)
    if (loginAttempt == null) {
        res.json({
            message: "Incorrect Username",
            login: false,
        });
    }
    else if(loginAttempt.active == false)
    {
      console.log("Not active");
      res.json({
        message: "No longer active user",
        login: false,
    });
    } 
    else{
        // console.log(checkLoginAttempt(loginAttempt, loginAttempt.id, loginAttempt.username, loginAttempt.password, username, password));
        
            bcrypt.compare(password, loginAttempt.password).then((isCorrect) => {
                console.log(isCorrect);
                if (isCorrect) {
                  
              
            console.log("here")
            const user = {
                id: loginAttempt._id,
                username: loginAttempt.username,
            };
            jwt.sign(
                user,
                process.env.JWT_SECRET,
                { expiresIn: 86400 },
                (err, token) => {
                if (err) {
                    console.log("oops!", err);
                    console.log(JSON.stringify(user));
                    return res.json({ message: err });
                }
                console.log("here")
              return res.json({
                message: "Login Successfully",
                token: "Bearer " + token,
                username: loginAttempt.username,
                userId: loginAttempt._id,
                login: true,
              });
            }
          );
        } else {
          return res.json({ message: "Login Unsuccessful", login: false });
        }
    });
}
}


  

//this verifys the logged in user.
//not important for frontend
function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"]?.split(" ")[1];
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.json({
          isLoggedIn: false,
          message: "Failed to authenticate, she doesn't even go here",
        });
      }
      req.user = {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
      next();
    });
  } else {
    res.json({
      message: "Incorrect token given, Who are you?",
      isLoggedIn: false,
    });
  }
}

// //gets a user from id
// //url: api/user/:id
// //probably not super useful
// const getUser = async (req, res) => {
//   const { id } = req.params;

//   const post = await db.User.findOne({ username: id }).populate("pets");

//   res.status(200).json(post);
// };

// //gets the currently logged in users' profile
// //url: api/user

const getProfile = async (req, res) => {
  const user = await db.Sensei.findOne({ username: req.user.username })

  res.status(200).json(user);
};

const getSenseis = async (req, res) => {
  const users = await db.Sensei.find({ })

  res.status(200).json(users);
};

const updateSensei = async (req, res) => 
{
    const { id } = req.params;
    // console.log(id);
    console.log(req.body)
    const userToUpdate = await db.Sensei.findOneAndUpdate(
        { _id: id },
        {
          ...req.body,
        }
      );
      if (!userToUpdate) {
        return res.status(400).json({ error: "No such Sensei" });
      }
  
      const user = await db.Sensei.findOne({ _id: id });
  
      res.status(200).json(user);
}


module.exports = {
    registerUser,
    loginUser,
    verifyJWT,
    getProfile,
    getSenseis,
    updateSensei,
};