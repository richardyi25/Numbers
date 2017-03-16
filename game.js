var deck = [], used = [];
var peer, conn;
var sent = false, received = false;
var to, from;
var playerScore = 0, opponentScore = 0;
var turn = 0, round = 0;

function cardClicked(index){
	$('.player-card:nth-of-type(' + index + ') > .card').attr('type', 'disabled');
	used[index - 1] = true;
	$('#player-board-card > .card').attr('type', 'player-hidden');
	$('#player-board-card > .card').text('?');

	send(deck[Number.parseInt(index) - 1]);
}

function cardReceived(){
	$('#opponent-board-card > .card').attr('type', 'opponent-hidden');
	$('#opponent-board-card > .card').text('?');
}

function display(){
	$('#player-board-card > .card').attr('type', 'regular');
	$('#player-board-card > .card').text(to);

	$('#opponent-board-card > .card').attr('type', 'regular');
	$('#opponent-board-card > .card').text(from);

	if(to > from)
		++playerScore;
	else if(from > to)
		++opponentScore;

	$('#player-score').text(playerScore);
	$('#opponent-score').text(opponentScore);

	++turn;
	checkGame();
}

function newRound(){
	++round;
	turn = 0;
	for(var i = 0; i < 15; i++){
		used[i] = false;
		$('.player-card:nth-of-type(' + (i + 1) + ') > .card').text(deck[i]);
		$('.player-card:nth-of-type(' + (i + 1) + ') > .card').attr('color', 'color' + deck[i]);
		$('.player-card:nth-of-type(' + (i + 1) + ') > .card').attr('type', 'regular');
	}
}

function checkGame(){
	if(turn == 15)
		newRound();

	if(round > 2 && playerScore != opponentScore)
		endGame();
}

function endGame(){
	alert((playerScore > opponentScore ? "You won " : "You lost ") + playerScore + " to " + opponentScore + "!");
	window.location.reload();
}
