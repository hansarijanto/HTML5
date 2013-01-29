var Object = function ( name, posX, posY, sprite, collider ) 
{	
	if ( name      !== undefined ) this.name      = name;
	if ( posX      !== undefined ) this.posX      = posX;
	if ( posY      !== undefined ) this.posY      = posY;
	// if ( behaviors !== undefined ) this.behaviors = behaviors;
	
	this.sprite		= sprite;	
	this.collider = collider;
	
	return this;
};

Object.prototype = {
	name: "noName",
	posX: 0,
	posY: 0,

	// update: function (context, time) 
	// {
	//    for (var i = this.behaviors.length; i > 0; --i) {
	//       this.behaviors[i-1].execute(this, context, time);
	//    }
	// },
  
};
