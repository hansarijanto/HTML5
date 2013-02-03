var CollisionManager = function ( player, enemies, items )
{	
	this.player  = player;
	this.enemies = enemies;
	this.items   = items;
	return this;
};

CollisionManager.prototype =
{
	player  : null,
	enemies : null,
	item    : null,
	
	hasCollided: function ( collider, target, context )
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
			if ( target.thing.type == 'enemy' )
			{
				collider.damage( 'right' );
			}
		}
		
		if( ( leftCollider <= rightTarget && leftCollider >= leftTarget ) && ( bottomCollider >= topTarget && bottomCollider <= bottomTarget ) )
		{
			if ( target.thing.type == 'enemy' )
			{
				collider.damage( 'left' );
			}
		}
		
		// target.thing.PosY + targetCollision.bottom;
		// target.thing.PosY - targetCollision.top;
	},
	hasPlayerCollided: function ( context )
	{
		this.hasCollided( this.player, this.enemies, context );
	}
};