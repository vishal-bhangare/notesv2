const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Notes = new Schema({
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
   collection: 'notes'
})

module.exports = mongoose.model('Notes', Notes)