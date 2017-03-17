function checkDeck(){
	deck = [];
	var s = $('input[name="deck-input"]').val();
	var count = 0;
	var cards = 0;

	for(var i = 0; i < s.length; i++){
		if("12345".indexOf(s[i]) == -1){
			continue;
		}
		count += Number.parseInt(s[i]);
		deck[cards++] = Number.parseInt(s[i]);
	}

	$('#deck-sum-info').text('Sum of cards: ' + count);
	$('#deck-count-info').text('Number of cards: ' + cards);

	if(count == 45)
		$('#deck-sum-info').css('color', 'green');
	else
		$('#deck-sum-info').css('color', 'red');

	if(cards == 15)
		$('#deck-count-info').css('color', 'green');
	else
		$('#deck-count-info').css('color', 'red');

	if(count != 45 || cards != 15){
		$('button[name="save-deck"]').prop('disabled', true);

		for(var r = 0; r < 3; r++){
			for(var c = 0; c < 5; c++){
				$('.row:nth-of-type(' + (r + 1) + ')>.col:nth-of-type(' + (c + 1) + ')>.card').text('!');
				$('.row:nth-of-type(' + (r + 1) + ')>.col:nth-of-type(' + (c + 1) + ')>.card').attr('color', 'color1');
			}
		}
	}
	else{
		$('button[name="save-deck"]').prop('disabled', false);
		$('#deck-info *').css('color', 'green');

		deck.sort();
		Cookies.set('deck', deck);

		for(var r = 0; r < 3; r++){
			for(var c = 0; c < 5; c++){
				$('.row:nth-of-type(' + (r + 1) + ')>.col:nth-of-type(' + (c + 1) + ')>.card').text(deck[r * 5 + c]);
				$('.row:nth-of-type(' + (r + 1) + ')>.col:nth-of-type(' + (c + 1) + ')>.card').attr('color', 'color' + deck[r * 5 + c]);
			}
		}
	}
}

$(document).ready(function(){
	var deckCookie = Cookies.getJSON('deck');
	if(deckCookie != undefined)
		deck = deckCookie;
	else
		deck = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5];

	$('button[name="play"]').click(function(){
		$('#menu').hide();
		$('#connect').show();
		$('#set-id').show();
		$('#connect-id').hide();
	});

	$('button[name="edit-deck"]').click(function(){
		$('#menu').hide();
		$('#edit').show();
		$('input[name="deck-input"]').val(deck.join(''));
		checkDeck();
	});
	
	$('input[name="deck-input"]').keyup(checkDeck);

	$('button[name="save-deck"]').click(function(){
		$('#edit').hide();
		$('#menu').show();
	});

	$('button[name="confirm-id"]').click(setID);

	$('input[name="set-id"]').keyup(function(e){
		if(e.which == 13)
			setID();
	});

	$('button[name="connect"]').click(tryToConnect);

	$('input[name="connect-id"]').keyup(function(e){
		if(e.which == 13)
			tryToConnect();
	});

	$('.player-card').click(function(){
		if(!(used[Number.parseInt(this.getAttribute('name')) - 1] || (sent && !received) || locked))
			cardClicked(this.getAttribute('name'));
	});

	$('button[name="rules"]').click(function(){
		$('#menu').hide();
		$('#rules').show();
	});

	$('button[name="about"]').click(function(){
		$('#menu').hide();
		$('#about').show();
	});

	$('button[name="close-rules"]').click(function(){
		$('#rules').hide();
		$('#menu').show();
	});

	$('button[name="close-about"]').click(function(){
		$('#about').hide();
		$('#menu').show();
	});

	$('button[name="close-connect"]').click(function(){
		$('#connect').hide();
		$('#menu').show();
	});
});
