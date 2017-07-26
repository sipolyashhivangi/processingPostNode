var http = require('http');
var querystring = require('querystring');
var util = require('util');
var form = require('fs').readFileSync('form.html');
var maxData = 2*1024*1024; //2mb
http.createServer(function(req, res){
	if(req.method === 'POST'){
		var postData = '';
		req.on('data',function(chunk){
			postData += chunk;
			if(postData>maxData){
				this.distroy();
			res.writeHead(413);
			res.end("Too large");
		}
		}).on('end',function(){

			var postUserData = querystring.parse(postData);
			console.log('user posted:\n', postData);
			res.end('you posted:/n'+ util.inspect(postUserData));
		});
	}
	if(req.method === 'GET'){
		res.writeHead(200, {'content-Type':'text/html'});
		res.end(form);
	}
}).listen(8080);