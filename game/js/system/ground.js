var Ground = function ( name, posX, posY )
{
	if ( name == 'grass' )
	{
		sprite = new getGroundSprite();
	}
	collision  = new Collision( sprite.getCurCell(), groundCollisionYOffset );
	this.thing = new Thing( name, posX, posY, sprite, 'ground', collision );	
	
	this.originalPosX = posX;
	this.originalPosY = posY;
	
	return this;
};

Ground.prototype = 
{	
	update: function ()
	{
	},
	
	paint: function ( context )
	{
		this.thing.paint( context );
	},
	
	reset: function ()
	{
		this.thing.posX = this.originalPosX;
		this.thing.posY = this.originalPosY;
	}
};

