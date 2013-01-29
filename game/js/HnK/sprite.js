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
		
     var cell = this.curAnim[ this.cellIndex ];
     context.drawImage(spritesheet, cell.left  , cell.top,
                                    cell.width , cell.height,
                                    left			 , top,
                                    cell.width , cell.height);
  },

	setAnim: function ( anim )
	{
		if ( this.animations[ anim ] != undefined )
		{
			this.reset();
			this.curAnim     = this.animations[ anim ];
			this.curAnimName = anim; 
		}
		else
		{
			alert( 'animation '+anim+' does not exist' );
		}
	}
};