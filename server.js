const express = require("express");
const socket = require("socket.io");
const PORT = process.env.PORT || 3500;
const app = express();

app.use(express.static(__dirname + "/public"));


const server = app.listen(PORT, ()=>{
	console.log(`App listenting on Port ${PORT}`)
})



const io = socket(server);

io.on('connection', (socket)=>{

	
	socket.on('chat', (data)=>{
		console.log(data.handle, data.message);
		io.sockets.emit('chat', {
			handle: data.handle,
			message: data.message
		});	
	});

	socket.on('typing',(data)=>{
		socket.broadcast.emit('typing', {handle: data.handle});
	});


});