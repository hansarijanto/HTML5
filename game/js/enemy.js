var Enemy = function ( name, posX, posY, sprite, type ) 
{	
	collision      = new Collision( sprite.getCurCell() );
	this.thing     = new Thing( name, posX, posY, sprite, type, collision );	
	
	return this;
};

Enemy.prototype = 
{
	thing               : null,
	lastUpdate					: 0,
	
  spriteAdvanceRate   : 700,
	lastSpriteAdvance		: 0,
	velocityY           : 170,
	velocityX           : 170,

	update: function ( context, time, background, fps, canvas )
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
	},
	
	backgroundUpdate: function ( distanceMoved )
	{
		this.thing.posX += distanceMoved;
	},
	
	paint: function ( context )
	{
		this.thing.paint( context );
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
	}
};
