var Ground = function ( name, posX, posY )
{
	if ( name == 'grass' )
	{
		sprite = new getGroundSprite();
	}
	collision  = new Collision( sprite.getCurCell() );
	this.thing = new Thing( name, posX, posY, sprite, 'ground', collision );	
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
	}
};

