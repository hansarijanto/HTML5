var Player = function ( name, posX, posY, sprite, collider ) 
{	
	this.thing      = new Thing( name, posX, posY, sprite, collider );	
	this.jump_timer = new AnimationTimer( 300 );
	return this;
};

Player.prototype = 
{
	thing               : null,
	lastSpriteAdvance   : 0,
  spriteAdvanceRate   : 100,
	velocityY           : 100,

	jumping             : false,
	jumpTimer           : null,
	initialJumpHeight   : 0,

	update: function ( context, time )
	{
		this.setSpriteAdvanceRate();
		
		// Advancing Sprite	
    if ( time - this.lastSpriteAdvance > this.spriteAdvanceRate ) 
		{
       this.thing.sprite.advance();
       this.lastSpriteAdvance = time;
    }
	},
	
	paint: function ( context )
	{
		this.thing.paint( context );
	},
	
	setSpriteAdvanceRate: function ()
	{
		// Can set sprite advance rate here
	},
	
	getCurAnimName: function ()
	{
		return this.thing.sprite.curAnimName;
	},
	
	run: function ()
	{
		// Have to move the background based on running direction
		if ( this.getCurAnimName() != 'run' ) this.thing.sprite.setAnim( 'run' );
	},
	
	idle: function ()
	{
		// Neutralize all other actions
		this.thing.sprite.setAnim( 'idle' );
	},
	
	jump: function ()
	{
		// Make player jump
		this.thing.sprite.setAnim( 'jump' );
		jumping = true;
	}
};
