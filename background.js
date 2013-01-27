var sky = new Image(),
		skyOffset = 0,
		SKY_VELOCITY = 75;

// Functions.....................................................

function drawBackground() {
	   context.save();
	   context.translate(-skyOffset, 0);
	   context.drawImage(sky, 0, 0);
	   context.drawImage(sky, sky.width-2, 0);
	   context.restore();
}

function updateBackground( walking ) {
	
	if ( walking == 'right' )
	{
		skyOffset = skyOffset < canvas.width ?
	              skyOffset + SKY_VELOCITY/fps : 0;
	}
	else if ( walking == 'left' )
	{
		skyOffset = skyOffset > 0 ?
	              skyOffset - SKY_VELOCITY/fps : 0;
	}								
}

// Initialization................................................
sky.src = 'image/sky.png';