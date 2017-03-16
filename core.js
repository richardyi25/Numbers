var deck = [];
var peer, conn;
var sent = false, received = false;
var to, from;
var count = 0;

function connect(c){
	$('#id').hide();
	$('#connect').hide();
	$('#message').show();

	alert('Connection formed. The game has started!');

	c.on('data', function(data){
		receive(data);
	});

	c.on('close', function(){
		alert("Your opponent has left.");
	});

	conn = c;
}

function display(){
	++count;
	$('#info').empty();
	$('#info').append('<div class = "message"><b>You sent:</b>  ' + to + '<br/><b>They sent:</b> ' + from + '</div>');

	if(to == from){
		alert('You won in ' + count + ((count == 1) ? ' round!' : ' rounds!') + '\nYou both said: ' + to);
		$('#info').empty();
		count = 0;
	}

	sent = false;
	received = false;
}

function send(data){
	to = data;
	conn.send(data);
	sent = true;

	if(received)
		display();
}

function receive(data){
	from = data;
	received = true;

	if(sent)
		display();
}

function setID(){
	peer = new Peer($('input[name="set-id"]').val(), {key: "vt963rvobi1cerk9"});

	peer.on('open', function(id){
		$('#set-id').hide();
		$('#connect-id').show();
		$('#your-id').text("Your ID is: " + id);
	});

	peer.on('error', function(err) {
		alert(err);
	});

	peer.on('connection', connect);
}

function sendMessage(){
	var message = $('input[name="message"]').val().toLowerCase();
	
	if(message.length == 0){
		alert("Please enter a message.");
		return;
	}

	for(var i = 0; i < message.length; i++){
		if('qwertyuiopasdfghjklzxcvbnm '.indexOf(message[i]) < 0){
			alert('Please enter words or phrases only.');
			return;
		}
	}

	message = message[0].toUpperCase() + message.slice(1);
	send(message);
}

function tryToConnect(){
	conn = peer.connect($('input[name="connect-id"]').val());
	
	conn.on('open', function(){
		connect(conn);
	});
}

window.onunload = window.onbeforeunload = function(e) {
	if (!!peer && !peer.destroyed) {
		peer.destroy();
	}
};
