/**
 * Created by yangjie on 2016/10/25.
 */
var express = require('express');
var router = express.Router();

//ͳһ���ظ�ʽ
var responseData;
router.use(function(req,res,next){
    responseData = {
        code:0, //0��ʾ���κδ���
        message:'' //������Ϣ
    };
    next();
});

//�û�ע��ӿ�
/*
* 1.�û�������Ϊ��
* 2.���벻��Ϊ��
* 3.�û����Ƿ��Ѿ���ע��(���ݿ��ѯ)
* */
router.post('/user/register',function(req,res,next){
  //console.log(req.body);
  var username = req.body.username,
      password = req.body.password;

  //�û����Ƿ�Ϊ��
  if(username === ''){
     responseData.code = 1;
     responseData.message = '�û�������Ϊ��!';
     res.json(responseData);//����Ϣת����json���ظ�ǰ��
     return;
  }
  //�����Ƿ�Ϊ��
  if(password === ''){
      responseData.code = 1;
      responseData.message = '���벻��Ϊ��!';
      res.json(responseData);
      return;
  }

  responseData.message = 'ע��ɹ�!';
  res.json(responseData);
});

module.exports = router;