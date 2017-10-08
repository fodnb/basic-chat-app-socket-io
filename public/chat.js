$(document).ready(()=>{

// set variable for the user during the session	
var handle;
// connects to the socket either by url or localhost
const socket = io.connect("https://boiling-earth-58619.herokuapp.com" || "http://localhost:3500");


// when you submit the button for user name it saves your handle and creates an input for messages and a button to submit your message.
$("#button").on('click', ()=>{
	if($("#handle").val() != '' ){
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
	}
});


//here we send users in chat the info that someone is typing.  by emitting this to the server wre can handle the information and broadcast to everyone else
$("#form").on('keypress', $("#message"), ()=>{
	socket.emit('typing', {handle});
});	

// on this click we submit the message back to the server and then send to all socket connections
$("#form").on('click', '#submitMessage', ()=>{
	if( $("#message").val() != ""){
	var message = $("#message").val();
	socket.emit('chat', {handle, message});
	$("#message").val("");
}
});

// when we receive the 'chat' message we add the message to the chat div when we receive the message we delete the message that someone is typing
socket.on('chat', (data)=>{
	var newChat = $("<p>");
	newChat.html(`${data.handle}: ${data.message}`);
	$("#chat").append(newChat);
	$("#typing").html('');

});


// when we receive notification that 'typing' then we add a comment to the screen that a specific user is typing.
socket.on('typing', (data)=>{
	$("#typing").html(`${data.handle} is typing`);
});

});