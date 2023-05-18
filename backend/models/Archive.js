const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Archive = new Schema({
   userId: {
      type: String
   },
   title: {
      type: String
   },
   description: {
      type: String
   },
   created_at: {
      type: String
   },
   updated_at: {
      type: String
   }
}, {
   collection: 'archive'
})

module.exports = mongoose.model('Archive', Archive)