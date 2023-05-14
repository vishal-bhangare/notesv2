const express = require('express')
const app = express()
const notesRoute = express.Router()

let Notes = require('../models/Notes')

notesRoute.route('/create').post((req, res, next) => {
    console.log(req.body);
  Notes.create(req.body)
  
  .then(function (data) {
    console.log("data -->"+data);
    res.json(data)
})
.catch(function (err) {
    return next(err)
});
})

notesRoute.route('/').get((req, res,next) => {
    Notes.find()
    .then(function (data) {
        console.log("data -->"+data);
        res.json(data)
    })
    .catch(function (err) {
        return next(err)
    });
});

notesRoute.route('/read/:id').get((req, res) => {
  Notes.findById(req.params.id)
  .then(function (data) {
    console.log("data -->"+data);
    res.json(data)
})
.catch(function (err) {
    return next(err)
});
})

notesRoute.route('/update/:id').put((req, res, next) => {
  Notes.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    })
    .then((data)=>{
        res.json(data)
        console.log('Data updated successfully')
    })
    .catch((error)=>{
        console.log(error)
        return next(error)
    })
})

notesRoute.route('/delete/:id').delete((req, res, next) => {
  Notes.findOneAndRemove(req.params.id)
  .then((data)=>{
    res.status(200).json({
        msg: data,
      })
  })
  .catch((err)=>{
    return next(error)
  })
})

module.exports = notesRoute