const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const usersRoute = express.Router();
let userSchema = require("../models/User");
const authorize = require("../middlewares/auth");
const sendMail = require("../services/mail.service");

function changeTimeZone(date, timeZone) {
  if (typeof date === 'string') {
    return new Date(
      new Date(date).toLocaleString('en-US', {
        timeZone,
      }),
    );
  }

  return new Date(
    date.toLocaleString('en-US', {
      timeZone,
    }),
  );
}

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
          created_at:changeTimeZone(new Date(), 'Asia/Kolkata'), 
          updated_at:changeTimeZone(new Date(), 'Asia/Kolkata'), 
          name: req.body.name,
          email: req.body.email,
          password: hash,
          account_status: 0,
        });
        user
          .save({returnOriginal:false})
          .then((data) => {
            user_id = data["_id"];
            user_email = data["email"];
            user_name = data["name"];

            let user_token = jwt.sign(
              {
                userId: user_id,
              },
              process.env.TOKEN_SECRET,
              {
                expiresIn: "12h",
              }
            );

            sendVerificationMail(user_name, user_email, user_token);
            res.status(201).json({
              message: "User successfully created!",
              result: data,
            });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({
              error: error,
            });
          });
      });
    }
  });

usersRoute.route("/signin").post((req, res, next) => {
  query = {};
  if (req.query.id) {
    query = { _id: req.query.id };
    console.log(req.query.id);
  } else {
    query = { email: req.body.email };
  }

  let getUser;
  userSchema
    .findOne(query)
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
      getUser = user;
      if (req.query.id){ return true}
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
        process.env.TOKEN_SECRET,
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
      return res.json({
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
      res.status(200).json(data);
    })
    .catch(function (err) {
      return next(err);
    });
});
// Update User
usersRoute.route("/update-user/:id").put((req, res, next) => {
  userSchema
    .findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { returnOriginal: false }
    )
    .then((data) => {
      res.json(data);
      console.log("User successfully updated!");
    })
    .catch((err) => {
      return next(err);
    });
});
// Delete User
usersRoute.route("/delete-user/:id").delete((req, res, next) => {
  userSchema
    .findByIdAndRemove(req.params.id)
    .then((data) => {
      res.status(200).json({
        msg: data,
      });
    })
    .catch((error) => {
      return next(error);
    });
});

usersRoute.route("/verify-user/:token").put((req, res, next) => {
  user_id = jwt.decode(req.params.token, process.env.TOKEN_SECRET)["userId"];
  userSchema
    .findByIdAndUpdate(user_id, {
      $set: { account_status: 1 },
    },{returnOriginal:false})
    .then((data) => {
      res.json(data);
      console.log("User successfully updated!");
    })
    .catch((err) => {
      return next(err);
    });
});

// usersRoute.route("/signin/?token")
function sendVerificationMail(user_name, user_email, user_token) {
  subject =
    "<h2>Confirm Your Email Address</h2><br/><p>Hi " +
    user_name +
    ",<br />Tap the button to confirm your email address.<br />If you didn't create an account with 'APP_NAME', you can safely<br />  delete this email.</p><a href='"+process.env.BASE_URL+"/verify-user/" +
    user_token +
    "' target='_blank'><button style='    border: none;    background-color: #ffd166;    padding: 0.4rem 0.8rem;    font-size: 1rem;    border-radius: 3px;  '>Click to Verify Email</button></a>";
  sendMail(user_email, "Notes Verification Email", subject);
}
module.exports = usersRoute;
