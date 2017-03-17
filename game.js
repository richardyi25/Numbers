var deck = [], used = [], opponentKnown = [];
var peer, conn;
var sent = false, received = false;
var to, from;
var playerScore = 0, opponentScore = 0;
var turn = 0;
var locked = false;

function cardClicked(index){
	$('.player-card:nth-of-type(' + index + ') > .card').attr('color', 'color0');
	used[index - 1] = true;
	$('#player-board-card > .card').css('background-color', '#3399FF');
	$('#player-board-card > .card').text(deck[Number.parseInt(index) - 1]);

	send(deck[Number.parseInt(index) - 1]);
}

function cardReceived(){
	$('#opponent-board-card > .card').css('background-color', '#FF6666');
	$('#opponent-board-card > .card').text('?');
}

function display(){
	$('#player-board-card > .card').css('background-color', 'white');
	$('#player-board-card > .card').text(to);
	
	$('#opponent-board-card > .card').css('background-color', 'white');
	$('#opponent-board-card > .card').text(from);

	if(to > from){
		++playerScore;
		$('#player-board-card > .card').css('background-color', '#80FF80');
		$('#opponent-board-card > .card').css('background-color', '#FF8080');
		$('#player-animation').fadeIn(500);
		window.setTimeout(function(){
			$('#player-animation').hide();
		}, 1500);
	}
	else if(from > to){
		++opponentScore;
		$('#player-board-card > .card').css('background-color', '#FF8080');
		$('#opponent-board-card > .card').css('background-color', '#80FF80');
		$('#opponent-animation').fadeIn(500);
		window.setTimeout(function(){
			$('#opponent-animation').hide();
		}, 1500);
	}
	else{
		$('#player-board-card > .card').css('background-color', '#FFFF99');
		$('#opponent-board-card > .card').css('background-color', '#FFFF99');
	}

	$('#player-score').text(playerScore);
	$('#opponent-score').text(opponentScore);

	opponentKnown.push(from);
	opponentKnown.sort();

	for(var i = 0; i < opponentKnown.length; i++){
		$('.opponent-card:nth-of-type(' + (i + 1) + ') > .card').text(opponentKnown[i]);
		$('.opponent-card:nth-of-type(' + (i + 1) + ') > .card').attr('color', 'color' + opponentKnown[i]);
	}

	locked = true;
	window.setTimeout(function(){
		$('#player-board-card > .card').css({
			'background-color': 'white',
			'color': 'black'
		});
		$('#opponent-board-card > .card').css({
			'background-color': 'white',
			'color': 'black'
		});
		$('#player-board-card > .card').text('#');
		$('#opponent-board-card > .card').text('#');
		locked = false;
	}, 1000);

	++turn;
	checkGame();
}

function newRound(){
	turn = 0;
	opponentKnown = [];
	for(var i = 0; i < 15; i++){
		used[i] = false;
		$('.player-card:nth-of-type(' + (i + 1) + ') > .card').text(deck[i]);
		$('.player-card:nth-of-type(' + (i + 1) + ') > .card').attr('color', 'color' + deck[i]);
	}

	$('.opponent-card > .card').attr('color', 'opponentBack');
	$('.opponent-card > .card').text('?');
}

function checkGame(){
	if(turn == 15){
		if(playerScore != opponentScore)
			endGame();
		else
			newRound();
	}
}

function endGame(){
	alert((playerScore > opponentScore ? "You won " : "You lost ") + playerScore + " to " + opponentScore + "!");
	window.location.reload();
}
