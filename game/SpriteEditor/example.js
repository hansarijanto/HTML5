var canvas        = document.getElementById('canvas'),
    context       = canvas.getContext('2d'),
    spritesheet   = new Image();
		left          = document.getElementById('left').value,
		top_space     = document.getElementById('top_space').value,
		width         = document.getElementById('width').value, 
		height        = document.getElementById('height').value;

// Functions................................................

function drawImage()
{
	context.drawImage(spritesheet, left, top_space,
                                 width, height,
                                 200, 100,
                                 width, height);
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

