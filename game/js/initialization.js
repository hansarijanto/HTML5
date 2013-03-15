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
		playerManager    = new PlayerManager(),

    lastTime 			= 0,
    lastFpsUpdate = { time: 0, value: 0 },
    fps 					= 0;

 		keys = {};