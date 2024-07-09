// const express = require('express');
// const routing = express.Router();
// const create = require('../model/dbsetup');
// var mongodb = require('mongodb');
// var dbConn= mongodb.MongoClient.connect('mongodb://localhost:27017');

// routing.get('/setupDb', (req, res, next) => {
//     create.setupDb().then((data) => {
//         res.send(data)
//     }).catch((err) => {
//         next(err)
//     })
// })
// // routing.post('/educatorRegister1',(req,res,next)=>{
// //     const edreg = new EducatorRegister(req.body);
// //     res.json(req.body);
// //     console.log(edreg);
// // })
// routing.post('/educatorRegister1', (req, res, next) => {
//    dbConn.then(function(db){
//        delete req.body._id;
//        db.collection('Educator').insertOne(req.body);
//    })
//    res.send('Register Successfully');
//    res.redirect('/educatorlogin')
// })
// module.exports=routing;

const express = require('express');
const routing = express.Router();
const mongoose = require('mongoose');
const create = require('../model/dbsetup');
const collection=require('../utilities/connection');
const Educator = collection.getEducatorCollection();
const Trainee = collection.getTraineeCollection();
const Feedback = collection.getFeedbackCollection();
const Contact = collection.getContactCollection();
const eserv = require('../service/user');
const { json } = require('body-parser');

routing.get('/educatordetails',(req,res,next)=>{
    Educator.find().exec().then(result=>{
        console.log(result);
        res.json(result)
    }).catch(err=>{
        next(err);
    })
})
routing.get('/traineedetails',(req,res,next)=>{
    Trainee.find().exec().then(result=>{
        console.log(result);
        res.json(result)
    }).catch(err=>{
        next(err);
    })
})
routing.get('/feedbackdetails',(req,res,next)=>{
    Feedback.find().exec().then(result=>{
        console.log(result);
        res.json(result)
    }).catch(err=>{
        next(err);
    })
})
routing.post('/educatorRegister1',(req,res,next)=>{
    var register = new Educator({
        EducatorBatch:req.body.EducatorBatch,
        EducatorId:req.body.EducatorId,
        EducatorPwd:req.body.EducatorPwd,
        EducatorTrack:req.body.EducatorTrack,
        EducatorStream:req.body.EducatorStream
    });
    register.save().then(result=>{
        console.log(result);
    }).catch(err=>{
        console.log(err);
        next(err);
    })
    res.send('ok');
})
routing.post('/traineeRegister1',(req,res,next)=>{
    var register = new Trainee({
        TraineeBatch:req.body.TraineeBatch,
        TraineeId:req.body.TraineeId,
        TraineePwd:req.body.TraineePwd,
        TraineeTrack:req.body.TraineeTrack,
        TraineeStream:req.body.TraineeStream
    });
    register.save().then(result=>{
        console.log(result);
    }).catch(err=>{
        console.log(err);
        next(err);
    })
    res.send('ok');
})
routing.get('/educatorlogin1',(req,res,next)=>{
    Educator.find().exec().then(result=>{
        console.log(result);
        res.json(result)
    }).catch(err=>{
        next(err);
    })
})
routing.get('/traineelogin1',(req,res,next)=>{
    Trainee.find().exec().then(result=>{
        console.log(result);
        res.json(result)
    }).catch(err=>{
        next(err);
    })
})
routing.post('/TraineeFeedback',(req,res,next)=>{
    console.log(req.body);
    var register = new Feedback({
        educatorid1:req.body.educatorid1,
        traineeid1:req.body.traineeid1,
        Ques1:req.body.Ques1,
        Ques2:req.body.Ques2,
        Ques3:req.body.Ques3,
        Ques4:req.body.Ques4,
        Ques5:req.body.Ques5,
        Ques6:req.body.Ques6,
        Ques7:req.body.Ques7,
        Ques8:req.body.Ques8,
        Ques9:req.body.Ques9,
    });

    register.save().then(result=>{
        console.log(result);
    }).catch(err=>{
        console.log(err);
        next(err);
    })
    res.send('ok');
})
routing.post('/contactregister',(req,res,next)=>{
    var register = new Contact({
       fullname:req.body.fullname,
       phone:req.body.phone,
       email:req.body.email,
       msg:req.body.msg
    });
    register.save().then(result=>{
        console.log(result);
    }).catch(err=>{
        console.log(err);
        next(err);
    })
    res.send('ok');
})
routing.get('/contact',(req,res,next)=>{
    Contact.find().exec().then(result=>{
        console.log(result);
        res.json(result)
    }).catch(err=>{
        next(err);
    })
})
routing.get('/educatorids',(req,res,next)=>{
    eserv.getAllEducatorIds().then(ids=>{
        res.json(ids);
    }).catch(err=> next(err));
})
routing.get('/educatorfeeds',(req,res,next)=>{
    Feedback.find().exec().then(result=>{
        console.log(result);
        res.json(result)
    }).catch(err=>{
        next(err);
    })
})
routing.get('/educatorstrengths',(req,res,next)=>{
    Feedback.find({},'Ques8',function(err,data){
        res.json(data);
    })
})
module.exports=routing;