/**
 * Created by yangjie on 2016/10/25.
 */
var mongoose = require('mongoose');

var usersSchema = require('../schemas/users');

//����һ��������ṹ��ģ��
module.exports = mongoose.model('User',usersSchema);