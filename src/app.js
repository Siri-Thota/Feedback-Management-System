// const express = require('express');
// const bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// const myErrorLogger = require('./utilities/errorlogger');
// const myRequestLogger = require('./utilities/requestlogger');
// const cors = require("cors")
// // const create = require('../model/dbsetup');
// const collection = require('./utilities/connection');
// const app = express();

// app.use(cors())
// app.use(bodyParser.json());
// app.use(express.static('public'))
// app.use(bodyParser.urlencoded({extended:true}))

// mongoose.connect('mongodb://localhost:27017/Emotion_DB')

// var db = mongoose.connection;

// app.use(myRequestLogger);
// // app.get('/setupDb', (req, res, next) => {
// //     create.setupDb().then((data) => {
// //         res.send(data)
// //     }).catch((err) => {
// //         next(err)
// //     })
// // })
// app.post('/educatorRegister1',(req,res)=>{
//     var EducatorBatch=req.body.EducatorBatch;
//     var EducatorId = req.body.EducatorId;
//     var EducatorPwd=req.body.EducatorPwd;
//     var EducatorTrack=req.body.EducatorTrack;
//     var EducatorStream=req.body.EducatorStream;
//     var data = {
//         "EducatorBatch":EducatorBatch,
//         "EducatorId":EducatorId,
//         "EducatorPwd":EducatorPwd,
//         "EducatorTrack":EducatorTrack,
//         "EducatorStream":EducatorStream
//     }
//     db.collection('Educator').insertOne(data,(err,collection)=>{
//         if(err){
//             throw err;
//         }
//         console.log('Registered Successfully')
//     });
// })
// app.post('/traineeRegister1',(req,res)=>{
//     var TraineeBatch=req.body.TraineeBatch;
//     var TraineeId = req.body.TraineeId;
//     var TraineePwd=req.body.TraineePwd;
//     var TraineeTrack=req.body.TraineeTrack;
//     var TraineeStream=req.body.TraineeStream;
//     var data = {
//         "TraineeBatch":TraineeBatch,
//         "TraineeId":TraineeId,
//         "TraineePwd":TraineePwd,
//         "TraineeTrack":TraineeTrack,
//         "TraineeStream":TraineeStream
//     }
//     db.collection('Trainee').insertOne(data,(err,collection)=>{
//         if(err){
//             throw err;
//         }
//         console.log('Registered Successfully')
//     });
// })

// app.use(myErrorLogger);


// app.listen(4000);
// console.log("Server listening in port 4000");


// module.exports = app;


const express=require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router=require('./routes/routing');
const connectDB = require('./model/dbsetup');
mongoose.Promise = global.Promise;
// mongoose.set('useCreateIndex', true)
mongoose.connect("mongodb://localhost:27017/Emotion_DB");
mongoose.connection.on('connected',()=>{
    console.log('MongoDB Connected Successfully')
})
mongoose.connection.on('error',()=>{
    console.log('Error Occured');
})
var app = express();
app.use(cors())
app.use(express.json())
app.use('/',router);
app.listen(4000);
console.log('Server Listening in Port 4000');