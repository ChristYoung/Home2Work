/**
 * Created by yangjie on 2016/10/24.
 * Ӧ����������ļ�
 */

var express = require('express');

//����ģ��
var swing = require('swig');

//�������ݿ�ģ��
var mongoose = require('mongoose');

//����body-parserģ��,����post�����ύ����������
var bodyParser = require('body-parser');

//����Ӧ�� => ��ͬ��NodeJs�е�Http.createServer
var app = express(); //express������еķ���

//��̬�ļ��й�
//���û����ʵ�url��/public��ʼ,��ôֱ�ӷ��ض�Ӧ��__dirname + '/public'�µ��ļ�
app.use('/public',express.static(__dirname + '/public'));

//����Ӧ��ģ��
//����Ӧ��ʹ�õ�ģ������
//��һ������:ģ�����������,ͬʱҲ��ģ���ļ��ĺ�׺,�ڶ���������ʾ���ڽ�������ģ�����ݵķ���
app.engine('html',swing.renderFile);

//����ģ���ļ���ŵ�Ŀ¼,��һ������������views,�ڶ���������Ŀ¼
app.set('views','./views');
//ע����ʹ�õ�ģ������,��һ������������view engine,�ڶ���������app.engine()�����ģ�����������(��һ������)��һ�µ�
app.set('view engine','html');
//�ڿ�����������Ҫȡ��ģ��Ļ������
swing.setDefaults({cache:false});

//bodyParse����
app.use(bodyParser.urlencoded({extended:true}));

//·��
/*
* ��ҳ
* req��ʾ����request����
* res��ʾ����response����
* next��ʾ������һ���󶨵ĺ���
* */
//app.get('/',function(req,res,next){
  //res.send('<h1>welcome to my blog</h1>');

  //��ȡviewsĿ¼�µ�ָ���ļ�,���������ظ��ͻ���,��һ��������ʾģ���ļ�,�ڶ���������ʾ���ݸ�ģ��ʹ�õ�����[��ѡ]
  //res.render('index');
//});

//ʹ��use������ģ����л���(���ݲ�ͬ�Ĺ��ܻ���ģ��)
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));

mongoose.connect('mongodb://localhost:27018/NodeBlog',function(err){
    if(err){
        console.log('database connection is fail');
    }else{
        console.log('database connection is success');
        app.listen(8081); //�����ݿ����ӳɹ��������Ӧ��,�����˿�
    }
});
