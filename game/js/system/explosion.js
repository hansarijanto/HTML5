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

	update: function ( context, time )
	{
		if ( this.explosionTimer.isOver() )
		{
			explosionManager.explosionToDelete += 1;
		}
		
		this.thing.advanceSprite( time, this.spriteAdvanceRate );
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