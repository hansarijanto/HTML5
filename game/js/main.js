function calculateFps( now ) 
{
   var fps = 1000 / (now - lastTime);
   lastTime = now;

   return fps; 
}

function initializePlayer()
{
	var playerSprite = new getPlayerSprite();
	var player 			 = new Player( 'player', playerPosX, playerPosY, playerSprite, 'player' );
	
	return player;
}

function initializeEnemy()
{
	var enemySprite = new getEnemy1Sprite();
	var enemy 			= new Enemy( 'enemy', enemyPosX, enemyPosY, enemySprite, 'enemy' );
	
	return enemy;
}

function initializeCollisionManager()
{
	var collisionManager = new CollisionManager( player, enemy, null );
	
	return collisionManager;
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
	enemy.update( context, time );
	bulletManager.update();
	
	background.paint( context );
	player.paint( context );
	enemy.paint( context );	
	bulletManager.paint( context );
	
	collisionManager.hasPlayerCollided( context );

	window.requestNextAnimationFrame( animate );
}

// Initialization

var canvas       = document.getElementById( 'canvas' ),
    context      = canvas.getContext( '2d' ),
		player       = initializePlayer(),
		enemy        = initializeEnemy(),
		
		bulletManager    = new BulletManager,		
		collisionManager = initializeCollisionManager(),
		
		background = new Background(),

    lastTime 			= 0,
    lastFpsUpdate = { time: 0, value: 0 },
    fps 					= 60;

context.strokeStyle = 'lightgray';
context.lineWidth = 0.5;

window.requestNextAnimationFrame( animate );
