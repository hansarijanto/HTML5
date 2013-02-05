var Enemy = function ( name, posX, posY ) 
{	
	if ( name == 'enemy1' )
	{
		sprite = new getEnemy1Sprite();
	}
	collision      = new Collision( sprite.getCurCell() );
	this.thing     = new Thing( name, posX, posY, sprite, 'enemy', collision );	
	
	return this;
};

Enemy.prototype = 
{
	thing               : null,
	lastUpdate					: 0,
	hp                  : 15,
	alive               : true,
	
  spriteAdvanceRate   : 700,
	lastSpriteAdvance		: 0,
	velocityY           : 170,
	velocityX           : 170,

	update: function ( context, time )
	{
		if( this.alive )
		{
			// Advancing Sprite	
			this.setSpriteAdvanceRate();
		
	    if ( time - this.lastSpriteAdvance > this.spriteAdvanceRate ) 
			{
	       this.thing.sprite.advance();
				 this.thing.collision.update( this.thing.sprite.getCurCell() );
	       this.lastSpriteAdvance = time;
	    }

			this.lastUpdate = time;
		}
	},
	
	backgroundUpdate: function ( distanceMoved )
	{
		this.thing.posX += distanceMoved;
	},
	
	paint: function ( context )
	{
		if( this.alive )
		{
			this.thing.paint( context );
		}
	},
	
	setSpriteAdvanceRate: function ()
	{
		// Can set sprite advance rate here
	},
	
	getCurAnimName: function ()
	{
		return this.thing.sprite.curAnimName;
	},
	reset: function ()
	{
		this.thing.posX = enemyPosX;
		this.thing.posY = enemyPosY;
	},
	damage: function()
	{
		this.hp -= 5;
		
		if( this.hp < 0 ) this.hp = 0;
		
		if ( this.hp <= 0 && this.alive )
		{
			this.alive = false;
			// this.thing.sprite.setAnim( 'dead', true );
			// this.deadTimer.start();
		}
	}
};
