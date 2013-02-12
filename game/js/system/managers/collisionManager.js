var CollisionManager = function ()
{	
	return this;
};

CollisionManager.prototype =
{	
	prevPlayerBottomCollider : 0,
	
	collisionCheck: function ( collider, target, context )
	{
		colliderCollision = collider.thing.collision;
		targetCollision   = target.thing.collision;
	
		rightCollider  = collider.thing.posX + colliderCollision.left;
		leftCollider   = collider.thing.posX;
		topCollider    = collider.thing.posY + colliderCollision.yOffset;
		bottomCollider = collider.thing.posY + colliderCollision.top;
	
		rightTarget  = target.thing.posX + targetCollision.left;
		leftTarget   = target.thing.posX;
		topTarget    = target.thing.posY + targetCollision.yOffset;
		bottomTarget = target.thing.posY + targetCollision.top;
	
		xCollision = this.collisionCheckX();
		yCollision = this.collisionCheckY();
		
		return xCollision+yCollision;
	},
	collisionCheckX: function ()
	{		
		leftCollided  = ( leftCollider >= leftTarget && leftCollider <= rightTarget   );
		rightCollided = ( rightCollider >= leftTarget && rightCollider <= rightTarget );
		
		if( rightCollided && leftCollided ) return 'middle';
		else if( rightCollided ) 						return 'right';
		else if( leftCollided  ) 						return 'left';
		else 																return 'none'
	},
	collisionCheckY: function ()
	{
		bottomCollided = ( bottomCollider >= topTarget && bottomCollider <= bottomTarget );
		topCollided    = ( topCollider >= topTarget && topCollider <= bottomTarget  		 );
		
		if( bottomCollided && topCollided ) return 'Middle';
		else if( bottomCollided ) 					return 'Bottom';
		else if( topCollided 		) 					return 'Top';
		else 																return 'None'
	},
	checkEnemyCollision: function ()
	{
		$.each( enemyManager.getEnemies(), function () 
		{ 
			// Check player collision with enemies
			var enemy = this;
			if( enemy.alive )
			{
				collisionDirection = collisionManager.collisionCheck( player, enemy, context ); 

				if 			( collisionDirection == 'rightTop' || collisionDirection == 'rightBottom' || collisionDirection == 'rightMiddle' ) player.damage( 'right' );
				else if ( collisionDirection == 'leftTop'  || collisionDirection == 'leftBottom' || collisionDirection == 'leftMiddle'  ) player.damage( 'left'  );
				else if ( collisionDirection == 'middleMiddle' || collisionDirection == 'middleBottom' || collisionDirection == 'middleTop' ) player.damage( 'left'  );
			
				// Check bullet collision with enemies
				var bulletToDelete = 0;
				$.each( bulletManager.getBullets(), function () 
				{
					var bullet = this;
					collisionDirection = collisionManager.collisionCheck( bullet, enemy, context ); 
					if ( collisionDirection != 'noneNone' && collisionDirection != 'noneMiddle' && collisionDirection != 'noneTop' && collisionDirection != 'noneBottom' && collisionDirection != 'middleNone' && collisionDirection != 'rightNone' && collisionDirection != 'leftNone' ) 
					{
						enemy.damage( collisionDirection );	
						bulletToDelete += 1;
					}
				});
			
				if ( bulletToDelete > 0 ) 
				{
					for ( var i = 0; i < bulletToDelete; ++i )
					{
						bulletManager.deleteBullet();
					}
				}
			}
		});
	},
	checkGroundCollision: function ( context )
	{
		var groundCollided = false;
		
		//TODO::Dont know why this.prevPlayerBottomCollider is undefined in the for each loop below
		prevPlayerBottomCollider = this.prevPlayerBottomCollider;
		$.each( background.groundManager.getGrounds(), function () 
		{ 
			// Check player collision with enemies
			var ground = this;
			if( player.alive )
			{
				collisionDirection = collisionManager.collisionCheck( player, ground, context );
				//TODO::preferably keep previous bottom collider position of player and check that for ground collider
				if( ( collisionDirection == 'rightBottom' || collisionDirection == 'leftBottom' || collisionDirection == 'middleBottom' ) && prevPlayerBottomCollider < bottomCollider + 1 )
				{
					groundCollided = true;
					if( player.falling )
					{
						player.stopFalling();
					
						if ( player.running ) 
						{
							if( player.getCurAnimName() != 'run' ) player.thing.sprite.setAnim( 'run', true );
						}
						else if ( !player.hit )
						{ 
							player.idle();
						}
						
						player.thing.posY = ground.thing.posY + ground.thing.collision.yOffset - player.thing.collision.top;
					}
				}
				
				if( collisionDirection == 'rightMiddle' || collisionDirection == 'leftMiddle' || collisionDirection == 'leftTop' || collisionDirection == 'rightTop' )
				{
					player.running = false;
				}
			}
		});
		if ( !groundCollided )
		{
			if ( !player.falling && !player.jumping ) 
			{
				player.fall();
			}
		}
		this.prevPlayerBottomCollider = player.thing.posY + player.thing.collision.top;
	},
	update: function ( context )
	{
		this.checkEnemyCollision();
		this.checkGroundCollision( context );
	}
};