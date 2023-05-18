const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Trash = new Schema({
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
   },
   deleted_at:{
    type:String
   }
}, {
   collection: 'trash'
})

module.exports = mongoose.model('Trash', Trash)