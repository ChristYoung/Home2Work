/**
 * Created by yangjie on 2016/10/25.
 */
var express = require('express');
var router = express.Router();

//统一返回格式
var responseData;
router.use(function(req,res,next){
    responseData = {
        code:0, //0表示无任何错误
        message:'' //错误信息
    };
    next();
});

//用户注册接口
/*
* 1.用户名不能为空
* 2.密码不能为空
* 3.用户名是否已经被注册(数据库查询)
* */
router.post('/user/register',function(req,res,next){
  //console.log(req.body);
  var username = req.body.username,
      password = req.body.password;

  //用户名是否为空
  if(username === ''){
     responseData.code = 1;
     responseData.message = '用户名不能为空!';
     res.json(responseData);//将信息转换成json返回给前端
     return;
  }
  //密码是否为空
  if(password === ''){
      responseData.code = 1;
      responseData.message = '密码不能为空!';
      res.json(responseData);
      return;
  }

  responseData.message = '注册成功!';
  res.json(responseData);
});

module.exports = router;