var Sprite = function ( spritesheet, animations ) 
{	
	if ( spritesheet !== undefined )   this.spritesheet = spritesheet;
	if ( animations  !== undefined )   
	{
		this.animations   = animations;
		this.curAnim      = animations['idle'];
		this.curAnimName  = 'idle';
	}
	return this;
};

Sprite.prototype = {
	cellIndex   : 0,
	animations  : [],
	curAnim     : [],
	curAnimName : null,

	advance: function () 
	{
     if ( this.cellIndex == this.curAnim.length-1 ) this.reset();
     else 																					this.cellIndex++;
  },

  reset: function () 
	{
		this.cellIndex = 0;
  },
  
  paint: function ( context, left, top ) 
	{
		 if( context == undefined ) alert( 'context in sprite,js paint is undefined' );
		
     var cell = this.getCurCell();
		 if( cell == undefined ) alert( 'cell in sprite.js is undefined, cellIndex: '+this.cellIndex );
     context.drawImage(this.spritesheet, cell.left  , cell.top,
		                                     cell.width , cell.height,
		                                     left			 , top,
		                                     cell.width , cell.height);
  },

	setAnim: function ( anim, reset )
	{
		if ( this.animations[ anim ] != undefined )
		{
			if ( reset ) this.reset();
			this.curAnim     = this.animations[ anim ];
			this.curAnimName = anim; 
		}
		else
		{
			alert( 'animation '+anim+' does not exist' );
		}
	},
	
	getCurCell: function ()
	{
		return this.curAnim[ this.cellIndex ];
	}
};