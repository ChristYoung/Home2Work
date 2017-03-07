/**
 * Created by yangjie on 2016/10/25.
 */

var mongoose = require('mongoose');

//定义用户数据结构(表结构)

module.exports = new mongoose.Schema({  //一个属性就是一个字段

    username: String,   //用户名

    password: String   //密码
});