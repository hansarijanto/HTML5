var Explosion = function ( name, posX, posY ) 
{	
	if ( name == 'explosion1' )
	{
		sprite = new getExplosion1Sprite();
	}
	this.thing     			= new Thing( name, posX, posY, sprite, 'explosion', null );	
	this.explosionTimer = new AnimationTimer( 1000 );
	
	return this;
};

Explosion.prototype = 
{
	thing               : null,
	
	explosionTimer      : null,
  spriteAdvanceRate   : 350,
	lastSpriteAdvance		: 0,

	update: function ( context, time )
	{
		if ( this.explosionTimer.isOver() )
		{
			explosionManager.explosionToDelete += 1;
		}
		
		if ( this.lastSpriteAdvance == 0 ) this.lastSpriteAdvance = time;
    if ( time - this.lastSpriteAdvance > this.spriteAdvanceRate ) 
		{
       this.thing.sprite.advance();
       this.lastSpriteAdvance = time;
    }
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
	}
};