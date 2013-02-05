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
		topCollider    = collider.thing.posY;
		bottomCollider = collider.thing.posY + colliderCollision.top;
	
		rightTarget  = target.thing.posX + targetCollision.left;
		leftTarget   = target.thing.posX;
		topTarget    = target.thing.posY;
		bottomTarget = target.thing.posY + targetCollision.top;
	
		if ( ( rightCollider >= leftTarget && rightCollider <= rightTarget ) && ( bottomCollider >= topTarget && bottomCollider <= bottomTarget ) )
		{
			return 'right';
		}
		else if( ( leftCollider <= rightTarget && leftCollider >= leftTarget ) && ( bottomCollider >= topTarget && bottomCollider <= bottomTarget ) )
		{
			return 'left';
		}
		else
		{
			return undefined;
		}
	},
	update: function ( context )
	{
		$.each( enemyManager.getEnemies(), function () 
		{ 
			// Check player collision with enemies
			var enemy = this;
			if( enemy.alive )
			{
				collisionDirection = collisionManager.collisionCheck( player, enemy, context ); 
				if ( collisionDirection != undefined ) player.damage( collisionDirection );
			
				// Check bullet collision with enemies
				var deleteBullet = false;
				$.each( bulletManager.getBullets(), function () 
				{
					var bullet = this;
					collisionDirection = collisionManager.collisionCheck( bullet, enemy, context ); 
					if ( collisionDirection != undefined ) 
					{
						enemy.damage( collisionDirection );	
						deleteBullet = true;
					}
				});
			
				if ( deleteBullet ) bulletManager.deleteBullet();
			}
		});		
	}
};