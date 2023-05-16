const express = require("express");
const app = express();
const notesRoute = express.Router();
const authorize = require("../middlewares/auth.js");
let Notes = require("../models/Notes");

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

notesRoute.route("/create").post(authorize, (req, res, next) => {
  console.log(req.body);
  const note = new Notes({
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    created_at: changeTimeZone(new Date(), "Asia/Kolkata"),
    updated_at: changeTimeZone(new Date(), "Asia/Kolkata"),
  });
  note
  .save({returnOriginal:false})
          .then((data) => {
      console.log("data -->" + data);
      res.status(201).json(data);
    })
    .catch(function (err) {
      return next(err);
    });
});

notesRoute.route("/").get(authorize, (req, res, next) => {
  if(!req.query.user){
    Notes.find()
      .then(function (data) {
        res.status(201).json(data);
      })
      .catch(function (err) {
        return next(err);
      });
  }else{
    Notes.find({"userId":req.query.user})
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      return next(err);
    });
  }
});

notesRoute.route("/:id").get(authorize, (req, res) => {
    Notes.findById(req.params.id)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      return next(err);
    });
});

notesRoute.route("/update/:id").put(authorize, (req, res, next) => {
  const note = new Notes({
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    updated_at: changeTimeZone(new Date(), "Asia/Kolkata"),
  });
  Notes.updateOne({_id : req.params.id}, {
    $set: {
      userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    updated_at: changeTimeZone(new Date(), "Asia/Kolkata")
    },
  })
    .then((data) => {
      res.json(data);
      console.log("Data updated successfully");
    })
    .catch((error) => {
      console.log(error);
      return next(error);
    });
});

notesRoute.route("/delete/:id").delete(authorize, (req, res, next) => {
  Notes.deleteOne({_id : req.params.id})
    .then((data) => {
      res.status(200).json({
        msg: data,
      });
    })
    .catch((err) => {
      return next(error);
    });
});

module.exports = notesRoute;
