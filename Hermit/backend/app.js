const express= require('express');
const app = express();
const { MongoClient, ServerApiVersion, GridFSBucket , ObjectId} = require("mongodb");
const multer = require('multer');
const { Readable } = require('stream');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage, limits: {fileSize: 6000000, files: 1}});
const mongodb = require('mongodb');
const { ObjectID } = require('mongodb');
// determines which origins (other servers) are allowed to access this server
app.use((req,res,next)=>{
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, HttpHeaders');
res.setHeader('Access-Control-Allow-Methods', "GET,POST, PATCH, DELETE, OPTIONS");
next();
})

//allows us to easily parse req bodies
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
//app.use('/images', express.static(path.join('backend/images')));

// routes that thhis server will catch and respond to relating to posts
//database initilaization
const uri="mongodb+srv://admin:admin@cluster0.ijyehgu.mongodb.net/Hermit?retryWrites=true&w=majority";
const client= new MongoClient(uri, {
    serverApi:{
        version: ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true,
    }
})
async function run(){
    try{
        await client.connect();
        await client.db("Hermit").command({ping:1});
        console.log('Connected to database: Backend is all set!');
    } catch(e){
        console.log('database error (Call Josh): ' + e);
    }
 }
 run();
  
 const database = client.db("Hermit");
 const post_collection= database.collection('posts');
 const bucket = new GridFSBucket(database, {bucketName: 'images'});

//posting a post to the database
  app.post('/api/posts',upload.single('Image'),(req,res, next)=>{
      const isImage= req.body.Image!='null';
      const post={
        Title:     req.body.Title,
        User:      req.body.User,
        Community: req.body.Community,
        Content:   req.body.Content,
        ImageName: req.body.ImageName,
        isImage:   isImage,

        }
        if(isImage){
            const unique_name=(Math.random() + 1).toString(36).substring(7);
            const uploadstream = bucket.openUploadStream(unique_name);
            post.PhotoId  =  uploadstream.id;
            post.PhotoPath = "http://localhost:3000/api/image/" + uploadstream.id;
            post.ImageFileName= unique_name;
            const readablePhotoStream = new Readable();
            readablePhotoStream.pipe(uploadstream);
            readablePhotoStream.push(req.file.buffer);
            readablePhotoStream.push(null);
            req.body.ImageName=unique_name;
            
        }else{
            post.PhotoId  = null;
            post.PhotoPath= null
        }
        
     
      post_collection.insertOne(post).then((data)=>{
        return res.status(200).json(data);
    }).catch(()=>{
        return res.status(404).json({no: err})
    })
      
  });
  
  app.get('/api/posts',(req,res,next)=>{
      let posts= [];
      const cursor= post_collection.find()
      cursor.toArray().then((posts)=>{
        return res.status(200).json({message:'succesful posting', posts: posts});
      }).catch((err)=>{
        return res.status(404).json({something_wrong: err});
      })

  });

  app.get('/api/image/:photoID', (req,res,next)=>{
    let id;
    try{
         id= new ObjectId(req.params.photoID);
    } catch(e) {
        res.status(400).json({message: "Invalid photo ID: " + e});
    }
    try{
    const downloadStream = bucket.openDownloadStream(id);
    downloadStream.on('data', (chunk) => {
        res.write(chunk);
    });
    
    downloadStream.on('error', () => {
        res.sendStatus(404);
    });
    
    downloadStream.on('end', () => {
        res.end();
    });
    }catch(e){
        res.status(400).json({message:"could not create valid database stream" + e});
    } 
     
  })

  app.delete("/api/posts/:id",(req,res,next)=>{
    let id;
    try{
        id= new ObjectId(req.params.id);
    }catch (e){
        res.status(400).json({message: "invalid post id: "+ e});
    }

    post_collection.findOne({_id: id}).then((post)=>{
        bucket.delete(post.PhotoId).catch((e));
    }).catch((e)=>{
        console.log("error delting post image: " + e);
    })
    
    post_collection.deleteOne({_id: id}).then(()=>{
        res.status(200).json({message: "successfully deleted!"});   
    }).catch((e)=>{
        res.status(400).json({error: "couldn't delete post id "+ req.params.id+ " because: "+ e });    
    })
    

   });


module.exports =  app;
