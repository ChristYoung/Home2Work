/**
 * Created by yangjie on 2016/10/25.
 */
var mongoose = require('mongoose');

var usersSchema = require('../schemas/users');

//创建一个操作表结构的模型
module.exports = mongoose.model('User',usersSchema);