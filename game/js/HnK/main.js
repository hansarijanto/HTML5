function calculateFps( now ) 
{
   var fps = 1000 / (now - lastTime);
   lastTime = now;

   return fps; 
}

function initializePlayer()
{
	var playerSprite 		= new getPlayerSprite();
	var player 					= new Player( 'player', 500, 380, playerSprite, null )
	
	return player;
}

function animate(time) {
	
	if ( time === undefined ) 
	{
     time = +new Date;
  }

  fps = calculateFps( time );

	context.clearRect(0,0,canvas.width,canvas.height);

	player.update( context, time );
	player.paint( context );

	window.requestNextAnimationFrame( animate );
}

// Initialization

var canvas  = document.getElementById( 'canvas' ),
    context = canvas.getContext( '2d' ),
		player  = initializePlayer(),

    lastTime 			= 0,
    lastFpsUpdate = { time: 0, value: 0 },
    fps 					= 60;

context.strokeStyle = 'lightgray';
context.lineWidth = 0.5;

// Listeners
window.addEventListener("keydown", function(e) 
{
	if( e.keyCode == 39 || e.keyCode == 37 )
	{
		player.run();
	}
	else if( e.keyCode == 32 )
	{
		player.jump();
	}
}, true);

window.addEventListener("keyup", function(e) 
{
	if( e.keyCode == 39 || e.keyCode == 37 )
	{
		player.idle();
	}
}, true);

window.requestNextAnimationFrame( animate );
