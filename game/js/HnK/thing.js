var Thing = function ( name, posX, posY, sprite, type, collision ) 
{	
	if ( name !== undefined ) this.name = name;
	if ( posX !== undefined ) this.posX = posX;
	if ( posY !== undefined ) this.posY = posY;
	
	this.type       = type;
	this.sprite			= sprite;	
	this.collision = collision;
	
	return this;
};

Thing.prototype = 
{
	name     	 : "noName",
	type			 : "noType",
	posX     	 : 0,
	posY     	 : 0,
	sprite   	 : null,
	collision  : null,

	paint: function ( context )
	{
		this.sprite.paint( context, this.posX, this.posY );
		
		//painting the collider
		if ( debug == true )
		{
			context.fillStyle = "rgba(0,0,0,.2)";
			context.fillRect ( this.posX, this.posY , this.collision.left ,this.collision.top );
		}
	}
};
