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
},{
   timestamps:
   {
     createdAt: 'created_at', // Use `created_at` to store the created date
     updatedAt: 'updated_at' // and `updated_at` to store the last updated date
   }
 })

module.exports = mongoose.model('Notes', Notes)