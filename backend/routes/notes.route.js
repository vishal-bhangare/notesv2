const express = require("express");
const app = express();
const notesRoute = express.Router();
const authorize = require("../middlewares/auth.js");
let Notes = require("../models/Notes");
let Archive = require("../models/Archive.js");
let Trash = require("../models/Trash.js");

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
// create new   note
notesRoute.route("/create").post(authorize, (req, res, next) => {
  console.log(req.body);
  const note = new Notes({
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    created_at: req.body.created_at ? req.body.created_at : changeTimeZone(new Date(), "Asia/Kolkata"),
    updated_at:  req.body.updated_at ? req.body.updated_at : changeTimeZone(new Date(), "Asia/Kolkata"),
  });
  note
  .save({returnOriginal:false})
          .then((data) => {
      res.status(201).json({
        message: "Note successfully created!",
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
// get all notes or filter by user id
notesRoute.route("/").get(authorize, (req, res, next) => {
  if(!req.query.user && !req.query.id){
    Notes.find()
      .then(function (data) {
        res.status(201).json(data);
      })
      .catch(function (err) {
        return next(err);
      });
  }
  else if(req.query.user){
    Notes.find({"userId":req.query.user})
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      return next(err);
    });
  }
  else if(req.query.id){
    Notes.findById(req.query.id)
    .then(function (data) {
     if(data){
      res.status(201).json(data);
     }
     else{
      res.json({"msg":"Not found"})
     }
    })
    .catch(function (err) {
      return next(err);
    });
  }

});
// update note using id
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
  },{returnOriginal:false})
    .then((data) => {
      res.json(data);
      console.log("Data updated successfully");
    })
    .catch((error) => {
      console.log(error);
      return next(error);
    });
});
// delete note
notesRoute.route("/delete/:id").delete(authorize, (req, res, next) => {
  Notes.deleteOne({_id : req.params.id})
    .then((data) => {
      res.status(200).json({
        msg: data,
      });
    })
    .catch((err) => {
      
      return next(err);
    });
});
notesRoute.route("/archive/").get(authorize, (req, res, next) => {
  console.log(req.query);
  if(req.query.user){
    console.log(req.query.user);
    Archive.find({"userId":req.query.user})
    .then(function (data) {
    res.status(201).json(data);
    })
    .catch(function (err) {
      console.log("err");
      return next(err);
    });
  }
  else if(req.query.id){
    Archive.findById(req.query.id)
    .then(function (data) {
    res.status(201).json(data);
    })
    .catch(function (err) {
      console.log("err");
      return next(err);
    });
  }
  else{
    return false;
  }

  
});
notesRoute.route("/archive/add").post(authorize, (req, res, next) => {
  data = new Archive({
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
  });
  data
  .save({returnOriginal:false})
          .then((data) => {
      res.status(201).json({
        message: "Note archived.",
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
notesRoute.route("/archive/remove/:id").delete(authorize, (req, res, next) => {
  Archive.deleteOne({_id : req.params.id})
    .then((data) => {
      res.status(200).json({
        msg: data,
      });
    })
    .catch((err) => {
      return next(error);
    });
});

notesRoute.route("/trash").get(authorize, (req, res, next) => {
  Trash.find({})
      .then(function (data) {
      res.status(201).json(data);
      })
      .catch(function (err) {
        console.log("err");
        return next(err);
      });
});
notesRoute.route("/trash/:id").get(authorize, (req, res, next) => {
  Trash.findById(req.params.id)
      .then(function (data) {
      res.status(201).json(data);
      })
      .catch(function (err) {
        console.log("err");
        return next(err);
      });
});
notesRoute.route("/trash/add").post(authorize, (req, res, next) => {
  data = new Trash({
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    deleted_at: changeTimeZone(new Date(), "Asia/Kolkata")
  });
  data
  .save({returnOriginal:false})
          .then((data) => {
      res.status(201).json({
        message: "Note moved to trash.",
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
notesRoute.route("/trash/remove/:id").delete(authorize, (req, res, next) => {
  Trash.deleteOne({_id : req.params.id})
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
