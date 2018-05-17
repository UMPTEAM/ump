const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/ump-master');

let db = mongoose.connection;
// 防止Mongoose: mpromise 错误
mongoose.Promise = global.Promise;

db.on('error', function(){
    console.log('数据库连接出错！');
});
db.on('open', function(){
    console.log('数据库连接成功！');
});

//声明schema
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    // recheck: String,
    token: String,
    email:String,
    permission: String,
    create_time: Date
});

const machineSchema = mongoose.Schema({
    //IP，名称，系统，配置,浏览器，运行内容，占用端口，用途，占用人，开始时间，结束时间，管理员，资产编码，购买日期，位置，备注。
    ip : String,
    name :String ,
    os : String,
    config : String,
    ie : String,
    purpose : String, //用途
    manager :String,
    pos : String,
    user : String,
    remarks : String
})

//根据schema生成model
const model = {
    User: mongoose.model('User', userSchema,'User'),
    Machine :mongoose.model('Machine',machineSchema,'Machine')
};



module.exports = model;
