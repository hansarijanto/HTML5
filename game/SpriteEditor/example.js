var canvas        = document.getElementById('canvas'),
    context       = canvas.getContext('2d'),
    spritesheet   = new Image();
		left          = document.getElementById('left').value,
		top_space     = document.getElementById('top_space').value,
		width         = document.getElementById('width').value, 
		height        = document.getElementById('height').value;
		
		spritesheet.onload = function()
		{
			$('#canvas')[0].width  = spritesheet.width;
			$('#canvas')[0].height = spritesheet.height;
			$('#results').css("padding-left", spritesheet.width + 15 );
		}
		
		// context.width  = spritesheet.width;
		// context.height = spritesheet.height;
		
		$('#generate').click(function(){
			generate();
			});

// Functions................................................

function drawImage()
{
	// context.drawImage(spritesheet, left, top_space,
	//                                  width, height,
	//                                  200, 100,
	//                                  width, height);
	context.drawImage(spritesheet, 0, 0,
                                 spritesheet.width, spritesheet.height,
                                 0, 0,
                                 spritesheet.width, spritesheet.height);

	context.fillStyle = "rgba(0,0,0,.2)";
	context.fillRect ( left, top_space , width ,height );																
}

function generate()
{
	$('#results').append('<div>{ left: '+left+', top: '+top_space+', width: '+width+', height: '+height+' },</div>');
}

function update()
{
	context.clearRect(0,0,canvas.width,canvas.height);
	left      = ( document.getElementById('left').value == null ) ? 10 : document.getElementById('left').value; 
	top_space = ( document.getElementById('top_space').value == null ) ? 10 : document.getElementById('top_space').value; 
	width     = ( document.getElementById('width').value == null ) ? 0 : document.getElementById('width' ).value; 
	height    = ( document.getElementById('height').value == null ) ? 0 : document.getElementById('height').value; 
	// context.drawImage(spritesheet, left, top_space);
	drawImage();
}

// Initialization................................................

spritesheet.src = '../image/x.png';
context.strokeStyle = 'lightgray';
context.lineWidth = 0.5;
update();
setInterval(update, 1000 / 10);

