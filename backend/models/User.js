const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
let userSchema = new Schema({
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