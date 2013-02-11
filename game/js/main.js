function calculateFps( now ) 
{
   var fps = 1000 / (now - lastTime);
   lastTime = now;

   return fps; 
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

	context.clearRect( 0, 0, canvas.width, canvas.height );

	enemyManager.update( context, time );
	bulletManager.update( context );
	explosionManager.update( context, time );
	player.update( context, time );	
	collisionManager.update( context );	
	
	background.paint( context );
	player.paint( context );
	enemyManager.paint( context );	
	bulletManager.paint( context );
	explosionManager.paint( context );

	window.requestNextAnimationFrame( animate );
}

// Initialization

var canvas       = document.getElementById( 'canvas' ),
    context      = canvas.getContext( '2d' ),
		canvasHeight = canvas.height;
		canvasWidth  = canvas.width;
		player       = new Player(),
		background 	 = new Background(),
		
		enemyManager     = new EnemyManager(),
		bulletManager    = new BulletManager,		
		explosionManager = new ExplosionManager(),
		collisionManager = new CollisionManager(),

    lastTime 			= 0,
    lastFpsUpdate = { time: 0, value: 0 },
    fps 					= 60;

 		keys = {};

context.strokeStyle = 'lightgray';
context.lineWidth = 0.5;

window.requestNextAnimationFrame( animate );
