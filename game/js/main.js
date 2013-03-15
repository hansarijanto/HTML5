function calculateFps( now ) 
{
   var fps = 1000 / (now - lastTime);
   lastTime = now;

   return fps; 
}
function fpsPaint() 
{
	context_2.font      = "normal 36px Verdana";
	context_2.fillStyle = "#000000";
	context_2.fillText( fps, wrapper.scrollLeft + 50, wrapper.scrollTop + 50 );
}
function animate( time ) 
{
	// Player Running Control
	if( !player.hit && player.alive )
	{
		if ( keys[ 39 ] ) 
		{
			player.run( true );
	  }
		if ( keys[ 37 ] ) 
		{
			player.run( false );
	  }
	}

	// Animation
	if ( time === undefined ) 
	{
	     time = +new Date;
	  }

	  fps = calculateFps( time );

	context_2.clearRect( 0, 0, canvasWidth, canvasHeight );

	enemyManager.update( context_2, time );
	explosionManager.update( context_2, time );
	playerManager.update( context_2, time );	
	collisionManager.update( context_2 );	

	playerManager.paint( context_2 );
	if( debug ) fpsPaint();
	enemyManager.paint( context_2 );	
	explosionManager.paint( context_2 );
	window.requestNextAnimationFrame( animate );
}

// Initialization
var canvas_1     = document.getElementById( 'canvas_1' ),
    context_1    = canvas_1.getContext( '2d' ),
		canvas_2     = document.getElementById( 'canvas_2' ),
    context_2    = canvas_2.getContext( '2d' ),

		wrapper 		 = document.getElementById( 'wrapper' ),
		wrapperWidth = parseFloat( wrapper.style.width ),
		canvasHeight = canvas_1.height,
		canvasWidth  = canvas_1.width,
	
		background 	 = new Background( context_1 ),
		
		enemyManager     = new EnemyManager(),		
		explosionManager = new ExplosionManager(),
		collisionManager = new CollisionManager(),
		
		curPlayerId   = Math.floor( Math.random()*11 ),
		playerManager = new PlayerManager( curPlayerId ),
		player        = playerManager.player,

    lastTime 			= 0,
    lastFpsUpdate = { time: 0, value: 0 },
    fps 					= 0;

 		keys = {};

if( true ) $('#log_body').show();
context_1.strokeStyle = 'lightgray';
context_1.lineWidth = 0.5;
