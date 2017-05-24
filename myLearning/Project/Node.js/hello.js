/**
 * Created by yangjie on 2016/10/21.
 */
console.log('hello');
console.log(__filename);

var http = require('http');
var querystring = require('querystring');

//创建一个web server服务
http.createServer(function(req, res) {
	var postData = '';
	req.setEncoding('utf8');
	//post事件传输的数据会先放到缓冲区
	//监听data事件
	req.on('data', function(chunk) {
		postData += chunk;
	});
	//监听end事件
	req.on('end', function() {
		res.end(postData);
	});
}).listen(8080);
console.log('this server is working');