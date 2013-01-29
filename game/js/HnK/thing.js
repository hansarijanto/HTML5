var Thing = function ( name, posX, posY, sprite, collider ) 
{	
	if ( name      !== undefined ) this.name      = name;
	if ( posX      !== undefined ) this.posX      = posX;
	if ( posY      !== undefined ) this.posY      = posY;
	
	this.sprite		= sprite;	
	this.collider = collider;
	
	return this;
};

Thing.prototype = {
	name     : "noName",
	posX     : 0,
	posY     : 0,
	sprite   : null,
	collider : null,

	paint: function ( context )
	{
		this.sprite.paint( context, this.posX, this.posY );
	}
};
