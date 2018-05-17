//by zyk 组织API接口层

const UserController = require('../controller/user.js');
const MachineController = require('../controller/machine');
const Router = require('koa-router');

const childRouter = new Router();

//checkToken作为中间件存在
//const checkToken = require('../token/checkToken.js');

childRouter.post('/login', UserController.Login);
childRouter.post('/findAll',MachineController.GetAllMachines);
//childRouter.post('/register', UserController.Reg);

//需要先检查权限的路由
//childRouter.get('/user', checkToken, UserController.GetAllUsers);
//childRouter.post('/delUser', checkToken, UserController.DelUser);

module.exports = childRouter;