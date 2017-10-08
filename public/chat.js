$(document).ready(()=>{


const socket = io.connect("http://localhost:3500");

$("#message").on('keypress', ()=>{
	const handle = $("#handle").val();
	socket.emit('typing', {handle});

});



$("#button").on('click', ()=>{

	var handle = $("#handle").val();
	var message = $("#message").val();
	socket.emit('chat', {handle, message});
	$("#handle").val("");	
	$("#message").val("");
	});

socket.on('chat', (data)=>{
	var newChat = $("<p>");
	newChat.html(`${data.handle}: ${data.message}`);
	$("#chat").append(newChat);
	$("#typing").html('');

});

socket.on('typing', (data)=>{
	$("#typing").html(`${data.handle} is typing`);
});

});