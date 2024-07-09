const db = require('../model/users');
let ebs={}
ebs.getAllEducatorIds=()=>{
    return db.getAllEducatorIds().then(idArray=>{
        if(idArray==null){
            let err = new Error("No Educator Ids Available")
            err.status=404;
            throw err;
        }
        else{
            let eids=[];
            for(let id of idArray){
                eids.push(id.EducatorId);
            }
            return eids;
        }
    })
}
module.exports=ebs;