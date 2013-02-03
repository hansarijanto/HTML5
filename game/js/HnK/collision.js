var Collision = function ( cell )
{	
	this.update( cell );	
	return this;
};

Collision.prototype =
{
	top  	 : 0,
	left 	 : 0,
	
	update: function( cell )
	{
		this.top  = cell.height;
		this.left = cell.width;
	}
};