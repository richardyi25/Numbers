function checkDeck(){
	var s = $('input[name="deck-input"]').val();
	var count = 0;
	var cards = 0;

	for(var i = 0; i < s.length; i++){
		if("12345".indexOf(s[i]) == -1){
			continue;
		}
		count += Number.parseInt(s[i]);
		++cards;
	}

	$('#deck-sum-info').text('Sum of cards: ' + count);
	$('#deck-count-info').text('Number of cards: ' + cards);

	if(count != 30 || cards != 10){
		$('button[name="save-deck"]').prop('disabled', true);
	}
	else{
		$('button[name="save-deck"]').prop('disabled', false);
		for(var r = 0; r < 2; r++){
			for(var c = 0; c < 5; c++){
				$('.row:nth-of-type(' + (r + 1) + ')>.col:nth-of-type(' + (c + 1) + ')>.card').text(s[r * 5 + c]);
				$('.row:nth-of-type(' + (r + 1) + ')>.col:nth-of-type(' + (c + 1) + ')>.card').attr('color', 'color' + s[r * 5 + c]);
			}
		}
	}
}

$(document).ready(function(){
	$('#edit').hide();

	$('button[name="play"]').click(function(){
		$('#menu').hide();
		$('#game').show();
	});

	$('button[name="edit-deck"]').click(function(){
		$('#menu').hide();
		$('#edit').show();
		$('input[name="deck-input"]').val('1234512345');
		checkDeck();
	});
	
	$('input[name="deck-input"]').keyup(function(){
		checkDeck();
	});
//	$('button[name=""]').click(function(){
//
//	});
//
//	$('button[name=""]').click(function(){
//
//	});
});
