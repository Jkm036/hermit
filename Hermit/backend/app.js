const express= require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const Account = require('./models/account');
const app = express();
const mongoose=require('mongoose');
const cors= require('cors');




mongoose.connect("mongodb+srv://admin:admin@cluster0.ijyehgu.mongodb.net/Hermit?retryWrites=true&w=majority")
.then(()=>{
    console.log('Muthii Connected to database');
}).catch(()=>{
    console.log('Muthii failed to connect to database -LOL');
});

app.use((req,res,next)=>{
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, HttpHeaders');
res.setHeader('Access-Control-Allow-Methods', "GET,POST, PATCH, DELETE, OPTIONS");
next();
})
app.use(cors())

app.options('/api/posts', cors())// allows pre-flight requests


app.use(bodyParser.json());



//-------------------------------------POST POST REQUESTS
app.post('/api/posts',(req,res, next)=>{
 const post=new Post({
    Title:req.body.Title,
    User:req.body.User,
    Community: req.body.Community,
    Content: req.body.Content,
 });
 
 post.save().then(
    (savedPost)=>{
        return res.status(201).json({
            _id: savedPost._id,
        });
    }
 );



})

//--------------------------------------POST GET REQUESTS
app.get('/api/posts',(req,res,next)=>{
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
//--------------------------------------POST DELETE REQUESTS
app.delete("/api/posts/:id",(req,res,next)=>{
    Post.deleteOne({_id:req.params.id}).then(()=>{
        return res.status(200).json({
            message:"post successfully (idk how to spellsuksefooly ) deleted!"
        });
    });
 });

module.exports = app;
