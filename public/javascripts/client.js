var width = 110
var height = 100

function loadData() {
	$('#clickmessage').show()
	$.get('/clouds', function(data) {
		console.log(data);
		data.forEach(function(pos){
			addContainer(pos.x, pos.y);
		});
	});
}

function storeData(x, y, done) {
	console.log('storing to database...');
	$.post('/clouds', {'x': x, 'y': y}, done);
} 

function addContainer(x, y, animate) {
	console.log('adding container');
	var clicks = document.getElementById('clicks');
	var el = document.createElement('div');
	$(el).addClass('cs');
	$(el).css({
      left:x + 'px',
      top:y + 'px',
      width:width + 'px',
      height:height + 'px'
	});
	if(animate){
		$(el).addClass('animated rubberBand');
	}
	clicks.appendChild(el);
	$('#intro').hide();
}

var onClick = function(e) {
	console.log('Clicked. X: ' + e.pageX + ' Y: ' + e.pageY);

	var x = e.pageX;
	var y = e.pageY;
	storeData(x, y, function() {
		addContainer(x, y, true);
	});
}

$(document).ready(loadData())