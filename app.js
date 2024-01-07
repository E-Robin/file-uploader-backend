
// const cloudinary = require('cloudinary').v2;
// cloudinary.config({ 
//     cloud_name: 'ds7yweb60', 
//     api_key: '919321638868114', 
//     api_secret: 'TzsiN8o9RbBSr_40ppT0jmO_Nug' 
//   });
// const upload = require('./helpers/storage')



const path = require('path')
const express = require('express');
const mongoose =require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const profileRoutes = require('./routes/profile');
// const fileUpload = require('express-fileupload');
const route = express.Router()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

// app.use(fileUpload({
//     useTempFiles:true
// }))

const url = "mongodb://127.0.0.1:27017/FileUpload";
const port =    process.env.port || '3000';

// this is connection of mongoAtlas
const dbString ="mongodb+srv://robin:xIACELlrltuJet14@cluster1.g1qfhgs.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(dbString);
const database = mongoose.connection;
database.on('open',()=>{
    console.log('database is connected')
})
database.on('error',()=>{
    console.log('database is not connected')
})



app.listen(port,()=>{
    console.log(`server is started at port ${port}`)
} ) ;

app.use('/images', express.static(path.join('images')));
// app.use(express.static(__dirname+"./images"))

app.use('/api/profiles',profileRoutes)

// app.get('/img',upload, async(req,res)=>{
//     res.send("hello express")
//    await cloudinary.v2.uploader.upload(req.file.filename )
//   .then((res)=>{
//     console.log(res)
//     res.send(res)
//   }).catch((err)=>{
//     console.log(err)
//   })
  
  
// })

