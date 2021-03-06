const Koa = require('koa');
const app = new Koa();
const cors = require('koa-cors'); 


app.use(cors());
//router
const Router = require('koa-router');

//父路由
const router = new Router();

//bodyparser:该中间件用于post请求的数据
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

//引入子路由  by zyk 子路由是否可用一个，验证一下？ 验证完毕，可以用公共一个。
const loginRouter = require('./server/routes/route.js');

//装载子路由
router.use('/api', loginRouter.routes(), loginRouter.allowedMethods());

//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());


app.listen(8888, () => {
    console.log('The server is running at http://localhost:' + 8888);
});