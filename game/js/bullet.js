var Bullet = function ( name, posX, posY, sprite, type )
{
	collision  = new Collision( sprite.getCurCell() );
	this.thing = new Thing( name, posX, posY, sprite, type, collision );	
	return this;
};

Bullet.prototype = 
{
	velocityX : 350,
	
	update: function ()
	{
		this.thing.posX += this.velocityX / fps;
	},
	paint: function ( context )
	{
		this.thing.paint( context );
	},
	backgroundUpdate: function ( distanceMoved )
	{
		this.thing.posX += distanceMoved;
	}
};