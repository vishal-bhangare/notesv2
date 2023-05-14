const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const usersRoute = express.Router();
let userSchema = require("../models/User");
const authorize = require("../middlewares/auth");

usersRoute
  .route("/signup", [
    check("name")
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage("Name must be atleast 3 characters long"),
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password should be between 5 to 8 characters long")
      .not()
      .isEmpty()
      .isLength({ min: 5, max: 8 }),
  ])
  .post((req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new userSchema({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then((response) => {
            res.status(201).json({
              message: "User successfully created!",
              result: response,
            });
          })
          .catch((error) => {
            res.status(500).json({
              error: error,
            });
          });
      });
    }
  });

usersRoute.route("/signin").post((req, res, next) => {
  let getUser;
  userSchema
    .findOne({
      email: req.body.email,
    })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
      getUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
      let jwtToken = jwt.sign(
        {
          email: getUser.email,
          userId: getUser._id,
        },
        "longer-secret-is-better",
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({
        token: jwtToken,
        expiresIn: 3600,
        _id: getUser._id,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Authentication failed",
      });
    });
});
// Get Users
usersRoute.route("/").get((req, res, next) => {
  userSchema
    .find()
    .then(function (data) {
      console.log("data -->" + data);
      res.status(200).json(data);
    })
    .catch(function (err) {
      return next(err);
    });
  // res.status(200).json(response)
});
// Get Single User
// usersRoute.route("/user-profile/:id").get(authorize, (req, res, next) => {
usersRoute.route("/user-profile/:id").get((req, res, next) => {
  userSchema
    .findById(req.params.id)
    .then(function (data) {
      console.log("data -->" + data);
      res.status(200).json({
        msg: data,
      });
    })
    .catch(function (err) {
      return next(err);
    });
});
// Update User
usersRoute.route("/update-user/:id").put((req, res, next) => {
  console.log(req.params.id);
  console.log(req.body);
  userSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    })
		.then((data)=>{
			res.json(data);
			console.log("User successfully updated!");
		})
		.catch((err)=>{return next(err)})
		
});
// Delete User
usersRoute.route("/delete-user/:id").delete((req, res, next) => {
  userSchema.findByIdAndRemove(req.params.id)    
		.then((data)=>{
      res.status(200).json({
        msg: data,
      });
    }) 
		.catch((error) =>{
      return next(error);
    })
});
module.exports = usersRoute;
