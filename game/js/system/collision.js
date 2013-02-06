var Collision = function ( cell, yOffset )
{	
	this.top  = cell.height;
	this.left = cell.width;
	if ( yOffset != undefined ) this.yOffset = yOffset;
	return this;
};

Collision.prototype =
{
	top  	  : 0,
	left 	  : 0,
	yOffset : 0,
	
	update: function( cell )
	{
		// this.top  = cell.height;
		this.left = cell.width;
	}
};