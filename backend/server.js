const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const sendMail = require("./services/mail.service");
const jwt = require("jsonwebtoken");
const { encryptData, decryptData } = require("./services/encryption.service");

require("dotenv").config();
// Connecting with mongo db     Vishal2108
mongoose
  .connect(
    "mongodb+srv://vishal:Vishal2108@cluster0.uvjuwun.mongodb.net/notes-app"
  )
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.reason);
  });

// Setting up port with express js
const notesRoute = require("../backend/routes/notes.route");
const usersRoute = require("../backend/routes/users.route");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());
// app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')))
// app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-crud-app')))
app.use("/api/users", usersRoute);
app.use("/api/notes", notesRoute);

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});

// data = {
//   name: "ram",
//   email: "ram@login.com",
//   password: "$2a$10$6wqA/Czb6OVItz/PZ.gZiOq/NklZN6VXUfBJ5bHZ1kctWKUrTXRtq",
//   account_status: 0,
//   _id: "6460d7d5fef4d2943edce5d3",
//   __v: 0,
// };

// console.log(data["_id"]);
// edata = encryptData(data)
// console.log(edata);
// console.log(decryptData(edata));

token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDYyMzI2MmRjZmJkNDljZTc3ZDA5NjAiLCJpYXQiOjE2ODQxNTcwMjYsImV4cCI6MTY4NDIwMDIyNn0.fc4lMUAXbMbl96Z6OSw-ejkCkUT0tz0_AY-OGnreU6U'
decoded = jwt.decode(token, process.env.TOKEN_SECRET);
console.log(decoded["userId"]);
// {
//     "userId":"1abcde",
//     "title":"title1",
//     "description":"description of title 1",
//     "created_at": "2014-02-10T10:50:42.389Z",
//     "updated_at": "2014-02-10T10:50:42.389Z"
// }

// subject = "<h2>Confirm Your Email Address</h2><br/><p>Hi JOHN,<br />Tap the button to confirm your email address.<br />If you didn't create an account with 'APP_NAME', you can safely<br />  delete this email.</p><a href='https://localhost:4200/verify-user/"+ user_id +"' target='_blank'><button style='    border: none;    background-color: #ffd166;    padding: 0.4rem 0.8rem;    font-size: 1rem;    border-radius: 3px;  '>Click to Verify Email</button></a>";
// sendMail('vishalbhangare2@gmail.com',"Confirm Your Email Address",subject)
