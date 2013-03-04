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
	bulletManager.update( context_2 );
	explosionManager.update( context_2, time );
	player.update( context_2, time );	
	collisionManager.update( context_2 );	
	
	player.paint( context_2 );
	if( debug ) fpsPaint();
	enemyManager.paint( context_2 );	
	bulletManager.paint( context_2 );
	explosionManager.paint( context_2 );
	// setTimeout(function() {
	window.requestNextAnimationFrame( animate );
	// }, 1000 / fixedFps);
}

// Initialization

var canvas_1     = document.getElementById( 'canvas_1' ),
    context_1    = canvas_1.getContext( '2d' ),
		canvas_2     = document.getElementById( 'canvas_2' ),
    context_2    = canvas_2.getContext( '2d' ),

		wrapper 		 = document.getElementById( 'wrapper' );
		wrapperWidth = parseFloat( wrapper.style.width );
		canvasHeight = canvas_1.height;
		canvasWidth  = canvas_1.width;
		player       = new Player(),
		background 	 = new Background( context_1 ),
		
		enemyManager     = new EnemyManager(),
		bulletManager    = new BulletManager,		
		explosionManager = new ExplosionManager(),
		collisionManager = new CollisionManager(),

    lastTime 			= 0,
    lastFpsUpdate = { time: 0, value: 0 },
    fps 					= 30;
		fixedFps      = 60;

 		keys = {};

context_1.strokeStyle = 'lightgray';
context_1.lineWidth = 0.5;

window.requestNextAnimationFrame( animate );
