const collection = require('../utilities/connection');

const EducatorDb = [
    {
        EducatorBatch: "T12",
        EducatorId: "E1003",
        EducatorPwd: "KPSkps123@",
        EducatorTrack: "UI",
        EducatorStream: "UI Mean"
    },
]
const TraineeDb = [{
    TraineeBatch: "B02",
    TraineeId: "T1234",
    TraineePwd: "NAVnav123@",
    TraineeTrack: "Java",
    TraineeStream: "Java React"
}]

exports.setupDb = () => {
    return collection.getEducatorCollection().then((educator) => {
        return educator.deleteMany().then(() => {
            return educator.insertMany(EducatorDb).then(() => {
                return collection.getTraineeCollection().then((trainee) => {
                    return trainee.deleteMany().then(() => {
                        return trainee.insertMany(TraineeDb).then((data) => {
                            if (data) return "Insertion Successfull"
                            else {
                                let err = new Error("Insertion failed");
                                err.status = 400;
                                throw err;
                            }
                        })
                    })
                })
            })
        })
    })
}

