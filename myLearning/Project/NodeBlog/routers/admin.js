/**
 * Created by yangjie on 2016/10/25.
 */

var express = require('express');
var router = express.Router();

//¼àÌý
router.get('/user',function(req,res,next){
   res.send('ADMIN-User');
});

module.exports = router;