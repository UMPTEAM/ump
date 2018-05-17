const Machine = require('../db.js').Machine;


//数据库的操作
//根据条件查找机器
const findMachine = (findstr) => {
    return new Promise((resolve, reject) => {
        Machine.findOne({ findstr }, (err, doc) => {
            if(err){
                reject(err);
            }
            resolve(doc);
        });
    });
};
//找到所有机器
const findAllMachines = () => {
    return new Promise((resolve, reject) => {
        Machine.find({}, (err, doc) => {
            if(err){
                reject(err);
            }
            console.log(doc);
            resolve(doc);
        });
    });
};



//获得所有机器信息
const GetAllMachines = async( ctx ) => {
    //查询所有机器信息
    let doc = await findAllMachines();
    ctx.status = 200;
    ctx.body = {
        succsess: '成功',
        result: doc
    };
};


module.exports = {
    GetAllMachines
};