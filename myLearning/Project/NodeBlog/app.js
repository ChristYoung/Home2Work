/**
 * Created by yangjie on 2016/10/24.
 * 应用启动入口文件
 */

var express = require('express');

//加载模板
var swing = require('swig');

//加载数据库模块
var mongoose = require('mongoose');

//加载body-parser模块,处理post请求提交过来的数据
var bodyParser = require('body-parser');

//创建应用 => 等同于NodeJs中的Http.createServer
var app = express(); //express框架特有的方法

//静态文件托管
//当用户访问的url以/public开始,那么直接返回对应的__dirname + '/public'下的文件
app.use('/public',express.static(__dirname + '/public'));

//配置应用模板
//定义应用使用的模板引擎
//第一个参数:模板引擎的名称,同时也是模板文件的后缀,第二个参数表示用于解析处理模板内容的方法
app.engine('html',swing.renderFile);

//设置模板文件存放的目录,第一个参数必须是views,第二个参数是目录
app.set('views','./views');
//注册所使用的模板引擎,第一个参数必须是view engine,第二个参数和app.engine()定义的模板引擎的名称(第一个参数)是一致的
app.set('view engine','html');
//在开发过程中需要取消模板的缓存机制
swing.setDefaults({cache:false});

//bodyParse设置
app.use(bodyParser.urlencoded({extended:true}));

//路由
/*
* 首页
* req表示的是request对象
* res表示的是response对象
* next表示的是下一个绑定的函数
* */
//app.get('/',function(req,res,next){
  //res.send('<h1>welcome to my blog</h1>');

  //读取views目录下的指定文件,解析并返回给客户端,第一个参数表示模板文件,第二个参数表示传递给模板使用的数据[可选]
  //res.render('index');
//});

//使用use方法对模块进行划分(根据不同的功能划分模块)
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));

mongoose.connect('mongodb://localhost:27018/NodeBlog',function(err){
    if(err){
        console.log('database connection is fail');
    }else{
        console.log('database connection is success');
        app.listen(8081); //当数据库连接成功后才启动应用,监听端口
    }
});
