function calculateFps( now ) 
{
   var fps = 1000 / (now - lastTime);
   lastTime = now;

   return fps; 
}

function animate( time ) 
{
	
	if ( time === undefined ) 
	{
     time = +new Date;
  }

  fps = calculateFps( time );

	context.clearRect( 0, 0, canvas.width, canvas.height );

	player.update( context, time );
	enemyManager.update( context, time );
	bulletManager.update();
	
	background.paint( context );
	player.paint( context );
	enemyManager.paint( context );	
	bulletManager.paint( context );
	
	collisionManager.update( context );

	window.requestNextAnimationFrame( animate );
}

// Initialization

var canvas       = document.getElementById( 'canvas' ),
    context      = canvas.getContext( '2d' ),
		player       = new Player(),
		
		enemyManager     = new EnemyManager(),
		bulletManager    = new BulletManager,		
		collisionManager = new CollisionManager(),
		
		background = new Background(),

    lastTime 			= 0,
    lastFpsUpdate = { time: 0, value: 0 },
    fps 					= 60;

context.strokeStyle = 'lightgray';
context.lineWidth = 0.5;

window.requestNextAnimationFrame( animate );
