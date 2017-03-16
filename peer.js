function connect(c){
	conn = c;

	$('#connect').hide();
	$('#game').show();
	startGame();

	conn.on('data', function(data){
		receive(data);
	});

	conn.on('close', function(){
		alert("Connection lost.");
		window.location.reload();
	});
}

function send(data){
	to = data;
	conn.send(data);
	sent = true;

	if(received){
		sent = false;
		received = false;
		display();
	}
}

function receive(data){
	from = data;
	received = true;

	if(sent){
		sent = false;
		received = false;
		display();
	}
}

function setID(){
	peer = new Peer($('input[name="set-id"]').val(), {key: "vt963rvobi1cerk9"});

	peer.on('open', function(id){
		$('#set-id').hide();
		$('#connect-id').show();
		$('#your-id').text("Your ID is: " + id);
	});

	peer.on('error', function(err) { alert(err); });

	peer.on('connection', connect);
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
