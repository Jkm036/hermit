const mongoose = require('mongoose');

const postSchema= mongoose.Schema({
    Title:    {type:String, required:true},
    User:     {type:String, required:true},
    Community:{type:String, required:true},
    Content:  {type:String, required:true},   
    ImageName:{type:String, require:true },
    isImage:  {type:String, required:true},
});


module.exports = mongoose.model('Post', postSchema);