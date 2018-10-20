const Koa = require('koa');
const Router = require('koa-router');
const path = require('path')
const app = new Koa();
const router = new Router();
const views = require('koa-views')
const static = require('koa-static')

const koa2Req = require('koa2-request')
const bodyParser = require('koa-bodyparser')
const multer = require('koa-multer')
app.use(bodyParser());

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}))

app.use(static(
    path.join(__dirname, './static')
))

router.get('/one', async function (ctx, next) {
    let title = 'hello koa2'
    await ctx.render('index',{
        title
    })
});

router.get('/', async function (ctx, next) {
    await ctx.render('two')
});

router.get('/www', async function (ctx, next) {
    var res =await koa2Req('https://www.apiopen.top/femaleNameApi?page=1', ) ;
    var title=res.body;
    await ctx.render('index',{
        title
    })
});


router.get('/getdata', async function (ctx, next) {
    var res =await koa2Req('https://www.apiopen.top/femaleNameApi', ctx.query) ;
    ctx.body=res.body
});


//配置    
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, './uploads')  //注意路径必须存在
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置
var upload = multer({ storage: storage })

router.post('/upload', upload.single('file'), async (ctx, next) => {
    ctx.body = {
        filename: ctx.req.file.filename,//返回文件名
        body:ctx.req.body
    }
});

app.use(router.routes())
app.listen(8090, () => {
    console.log('starting at port 8090');
});
