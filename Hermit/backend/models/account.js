const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    Email:{type:String , required:true},
    Firstname:{type:String , reqiured:true},
    Lastname:{type:String , reqiured:true},
    Username:{type:String , required:true},
    Password:{type:String, requried:true},


})
module.exports= mongoose.model('Account',accountSchema);
