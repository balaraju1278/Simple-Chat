var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/',function(req,res){
	res.sendFile(__dirname+'/index.html')
})
users = [];
io.on('connection',function(socket){
	console.log('user connected');
	socket.on('setUsername',function(data){
		console.log(data);
		
		if(users.indexOf(data) > -1){
			socket.emit('userExists',data +'user already taken pleade try another name');
		}
		else{
			users.push(data);
			socket.emit('userSet',{username:data});
		}
	});
	socket.on('msg',function(data){
		io.sockets.emit('newmsg',data);
	})
});
http.listen(8086,function(){
	console.log('listeing at localhost :8080');
});