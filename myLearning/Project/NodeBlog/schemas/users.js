/**
 * Created by yangjie on 2016/10/25.
 */

var mongoose = require('mongoose');

//�����û����ݽṹ(��ṹ)

module.exports = new mongoose.Schema({  //һ�����Ծ���һ���ֶ�

    username: String,   //�û���

    password: String   //����
});