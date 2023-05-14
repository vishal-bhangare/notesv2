const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
let userSchema = new Schema({
    created_at:{
        type: Date
    },
    updated_at:{
        type:Date
    },
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    account_status:{
        type:Number
    }
}, {
    collection: 'users'
},{
  timestamps:
  {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
  }
})
userSchema.plugin(uniqueValidator, { message: 'Email already in use.' });
module.exports = mongoose.model('User', userSchema)

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// let User = new Schema({
//    name: {
//       type: String
//    },
//    email: {
//       type: String
//    },
//    password: {
//       type: String
//    }
// }, {
//    collection: 'users'
// })

// module.exports = mongoose.model('User', User)
// models/User.js