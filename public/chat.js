$(document).ready(()=>{
var handle;

const socket = io.connect("https://boiling-earth-58619.herokuapp.com" || "http://localhost:3500");

$("#message").on('keypress', ()=>{
	const handle = $("#handle").val();
	socket.emit('typing', {handle});

});



$("#button").on('click', ()=>{
	handle = $("#handle").val();
	$("#form").empty();
	var chatSpace = $("<input>");
	chatSpace.attr("id", "message");
	chatSpace.attr("message", "message");
	chatSpace.attr("message", "message");
	$("#form").append(chatSpace);
	var submitMessage = $("<button>");
	submitMessage.attr('id',  "submitMessage");
	submitMessage.attr('value', "submit");
	submitMessage.html('Submit');
	$("#form").append(submitMessage);


	// var handle = $("#handle").val();
		console.log(handle);

	});


$("#form").on('click', '#submitMessage', ()=>{
	if( $("#message").val() != ""){
	var message = $("#message").val();
	socket.emit('chat', {handle, message});
	// $("#handle").val("");	
	$("#message").val("");
	console.log(handle);
	console.log("hi");
}
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