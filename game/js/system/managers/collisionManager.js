var CollisionManager = function ()
{	
	return this;
};

CollisionManager.prototype =
{	
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
	
		if ( ( rightCollider >= leftTarget && rightCollider <= rightTarget ) )
		{
			return this.yCollisionChecker( 'right' );
		}
		else if( ( leftCollider <= rightTarget && leftCollider >= leftTarget ) )
		{
			return this.yCollisionChecker( 'left' );
		}
		else
		{
			return undefined;
		}
	},
	yCollisionChecker: function ( xDirection )
	{
		if ( ( bottomCollider >= topTarget && bottomCollider <= bottomTarget ) ) return xDirection+'_top';
		else if ( ( topCollider >= topTarget && topCollider <= bottomTarget  ) ) return xDirection+'_bottom';
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
				
				if 			( collisionDirection == 'right_top' || collisionDirection == 'right_bottom' ) player.damage( 'right' );
				else if ( collisionDirection == 'left_top' || collisionDirection == 'left_bottom' 	) player.damage( 'left'  );
			
				// Check bullet collision with enemies
				var bulletToDelete = 0;
				$.each( bulletManager.getBullets(), function () 
				{
					var bullet = this;
					collisionDirection = collisionManager.collisionCheck( bullet, enemy, context ); 
					if ( collisionDirection != undefined ) 
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
		$.each( background.groundManager.getGrounds(), function () 
		{ 
			// Check player collision with enemies
			var ground = this;
			if( player.alive )
			{
				collisionDirection = collisionManager.collisionCheck( player, ground, context );
				if( collisionDirection == 'right_top' || collisionDirection == 'left_top' )
				{
					groundCollided = true;
					if( player.falling )
					{
						player.falling = false;
					
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
			}
		});
		if ( !groundCollided )
		{
			if ( !player.falling && !player.jumping ) 
			{
				player.falling = true;
				player.thing.sprite.setAnim( 'fall', true );
			}
		}
	},
	update: function ( context )
	{
		this.checkEnemyCollision();
		this.checkGroundCollision( context );
	}
};