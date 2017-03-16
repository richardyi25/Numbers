var deck = [], used = [];
var peer, conn;
var sent = false, received = false;
var to, from;
var playerScore = 0, opScore = 0;
var gameRunning = false;
var turn = 0, round = 0;

function cardClicked(index){
	$('.player-card:nth-of-type(' + index + ') > .card').attr('type', 'disabled');
	used[index] = true;
	send(deck[Number.parseInt(index) - 1]);
}

function checkGame(){
	if(turn == 15)
		++round;

	if(round > 1 && playerScore != opScore)
		endGame();
}

function display(){

}

function startGame(){
	gameRunning = true;
	for(var i = 0; i < 15; i++){
		$('.player-card:nth-of-type(' + (i + 1) + ') > .card').text(deck[i]);
		$('.player-card:nth-of-type(' + (i + 1) + ') > .card').attr('color', 'color' + deck[i]);
	}
}

function endGame(){
	alert((playerScore > opScore ? "You won " : "You lost ") + playerScore + " to " + opScore + "!");
	window.location.reload();
}
