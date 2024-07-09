// const { model } = require('mongoose');
const dbModel = require('../utilities/connection');
const c={};

c.getAllEducatorIds=()=>{
    return dbModel.getEducatorCollection1().then(model=>{
        return model.find({},{_id:0,EducatorId:1}).then(educatorids=>{
            if(educatorids.length>0) return educatorids;
            else return null;
        })
    })   
}
module.exports=c;