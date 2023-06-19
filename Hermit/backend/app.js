const express= require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const Account = require('./models/account');
const app = express();
const mongoose=require('mongoose');


mongoose.connect("mongodb+srv://admin:admin@cluster0.ijyehgu.mongodb.net/Hermit?retryWrites=true&w=majority")
.then(()=>{
    console.log('Muthii Connected to database');
}).catch(()=>{
    console.log('Muthii failed to connect to database -LOL');
});

app.use((req,res,next)=>{
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
res.setHeader('Access-Control-Allow-Methods', "GET,POST, PATCH, DELETE, OPTIONS");
next();
})
app.use(bodyParser.json())

//-------------------------------------POST POST REQUESTS
app.post('/api/post',(req,res, next)=>{
 const post=new Post({
    Title:req.body.Title,
    User:req.body.User,
    Community: req.body.Community,
    Content: req.body.Content,
 });
 
 post.save();

return res.status(201).json({
    message: "success",
});

})

//--------------------------------------POST GET REQUESTS
app.get('/api/post',(req,res,next)=>{
 let posts=[];
    Post.find()
    .then((Documents)=>{
        posts=Documents;
        return res.status(200).json({
            message:"posts sent succesfully",
            posts:posts
            });
        
    })
    .catch(()=>{
        console.log('Muthii: Something went wrong with getting posts');
    });

    
});

module.exports = app;
