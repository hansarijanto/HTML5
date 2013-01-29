var Newsprite = function ( spritesheet, cells ) 
{	
	if ( spritesheet !== undefined )   this.spritesheet = spritesheet;
	if ( cells       !== undefined )   this.cells       = cells;
	
	return this;
};

Newsprite.prototype = {
	cells     : [],
	cellIndex :  0,

	advance: function () 
	{
     if ( this.cellIndex == this.cells.length-1 ) this.reset();
     else 																			this.cellIndex++;
  },

  reset: function () 
	{
		this.cellIndex = 0;
  },
  
  paint: function ( context ) 
	{
     var cell = this.cells[ this.cellIndex ];
     context.drawImage(spritesheet, cell.left  , cell.top,
                                    cell.width , cell.height,
                                    sprite.left, sprite.top,
                                    cell.width , cell.height);
  }  
};