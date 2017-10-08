$(document).ready(()=>{


const socket = io.connect("http://localhost:3500");

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
});



});