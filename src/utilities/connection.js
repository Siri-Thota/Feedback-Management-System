// const { Schema } = require("mongoose");
// const Mongoose = require("mongoose")
// Mongoose.Promise = global.Promise;
// Mongoose.set('useCreateIndex', true)
// const url = "mongodb://localhost:27017/Emotion_DB";

// const EducatorSchema = Schema({
//     EducatorBatch: String,
//     EducatorId: String,
//     EducatorPwd: String,
//     EducatorTrack: String,
//     EducatorStream: String
// }, { collection: "Educator" });

// const TraineeSchema = Schema({
//     TraineeBatch: String,
//     TraineeId: String,
//     TraineePwd: String,
//     TraineeTrack: String,
//     TraineeStream: String
// }, { collection: "Trainee" });


// let collection = {};

// // collection.getEducatorCollection = () => {
// //     return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
// //         return database.model('Educator', EducatorSchema)
// //     }).catch((error) => {
// //         let err = new Error("Could not connect to Database");
// //         err.status = 500;
// //         throw err;
// //     })
// // }
// collection.getEducatorCollection=()=>{
//     return Mongoose.model('Educator',EducatorSchema);
// }

// collection.getTraineeCollection = () => {
//     return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
//         return database.model('Trainee', TraineeSchema)
//     }).catch((error) => {
//         let err = new Error("Could not connect to Database");
//         err.status = 500;
//         throw err;
//     })
// }

// module.exports = collection;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useCreateIndex',true)
const url = "mongodb://localhost:27017/Emotion_DB";
let collections=[];
let educatorRegisterSchema = new Schema(
    {
        EducatorBatch: {type:String},
        EducatorId: {type:String},
        EducatorPwd:{type:String} ,
        EducatorTrack: {type:String},
        EducatorStream: {type:String}
    },{collection:'Educator'}
);
let traineeRegisterSchema = new Schema(
    {
        TraineeBatch: {type:String},
        TraineeId: {type:String},
        TraineePwd:{type:String} ,
        TraineeTrack: {type:String},
        TraineeStream: {type:String}
    },{collection:'Trainee'}
);
let FeedbackSchema = new Schema(
    {
        educatorid1:{type:String},
    traineeid1:{type:String},
      Ques1:{type:String},
      Ques2:{type:String},
      Ques3:{type:String},
      Ques4:{type:String},
      Ques5:{type:String},
      Ques6:{type:String},
      Ques7:{type:String},
      Ques8:{type:String},
      Ques9:{type:String},
    },{collection:'Feedback'}
);
let contact = new Schema(
    {
        fullname:{type:String},
        phone:{type:String},
        email:{type:String},
        msg:{type:String}
    },{collection:'Contact'}
);
collections.getContactCollection=()=>{
    return mongoose.model('Contact',contact);
}
collections.getEducatorCollection=()=>{
        return mongoose.model('Educator',educatorRegisterSchema);
}
collections.getTraineeCollection=()=>{
    return mongoose.model('Trainee',traineeRegisterSchema);
}
collections.getFeedbackCollection=()=>{
    return mongoose.model('Feedback',FeedbackSchema);
}
collections.getEducatorCollection1 = () => {
    return mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('Educator',educatorRegisterSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}
module.exports=collections;