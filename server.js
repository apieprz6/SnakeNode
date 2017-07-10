var express = require('express');
var app = express();
var server = app.listen(3000);
app.use(express.static('public'));

console.log("Server is up");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

var highScore = 1;

function newConnection(socket){
	console.log('NEW CONNECTION: ' + socket.id);
	console.log('Sending' + highScore);
	var initScore = {totalLength: highScore}
	socket.emit('highScore', initScore);
	
	socket.on('length', updateScore);
	
	function updateScore(data){
		console.log(data);
		if(data.totalLength > highScore){
			highScore = data.totalLength;
			io.sockets.emit('highScore', data);
		}
	}
}