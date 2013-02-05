var Enemy = function ( name, posX, posY ) 
{	
	if ( name == 'enemy1' )
	{
		sprite = new getEnemy1Sprite();
	}
	collision      = new Collision( sprite.getCurCell() );
	this.thing     = new Thing( name, posX, posY, sprite, 'enemy', collision );	
	
	this.originalPosX = posX;
	this.originalPosY = posY;
	
	return this;
};

Enemy.prototype = 
{
	thing               : null,
	lastUpdate					: 0,
	hp                  : 15,
	alive               : true,
	hit                 : false,
	
	originalPosX        : 0,
	originalPosY        : 0,
	
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
		
			if ( this.lastSpriteAdvance == 0 ) this.lastSpriteAdvance = time;
	    if ( time - this.lastSpriteAdvance > this.spriteAdvanceRate ) 
			{
	       this.thing.sprite.advance();
				 this.thing.collision.update( this.thing.sprite.getCurCell() );
	       this.lastSpriteAdvance = time;
	    }
	
			if ( this.hit && enemyManager.hitTimer.isOver() ) this.hit = false;

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
			if( this.hit ) 
			{
				context.save();
				context.globalAlpha = 0.5;
			}
			this.thing.paint( context );
			context.restore();
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
		this.thing.posX = this.originalPosX;
		this.thing.posY = this.originalPosY;
		this.alive = true;
	},
	damage: function()
	{
		this.hp -= 5;
		
		if( this.hp < 0 ) this.hp = 0;
		
		if ( this.hp <= 0 && this.alive )
		{
			this.alive = false;
			explosionManager.createExplosion( 'explosion1', this.thing.posX, this.thing.posY );
		}
		else
		{
			this.hit = true;
			enemyManager.hitTimer.reset();
			enemyManager.hitTimer.start();
		}
	}
};
