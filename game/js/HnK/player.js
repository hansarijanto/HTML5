var Player = function ( name, posX, posY, sprite, collider ) 
{	
	this.thing     = new Thing( name, posX, posY, sprite, collider );	
	this.jumpTimer = new AnimationTimer( 400 );
	
	return this;
};

Player.prototype = 
{
	thing               : null,
	lastUpdate					: 0,
	
  spriteAdvanceRate   : 100,
	lastSpriteAdvance		: 0,
	velocityY           : 170,
	velocityX           : 170,

	jumping             : false,
	jumpTimer           : null,
	initialJumpHeight   : 0,
	
	falling							: false,
	
	running             : false,
	runningForward      : true,

	update: function ( context, time, background, fps, canvas )
	{
		// Falling
		if ( this.falling )
		{
			// TODO::Stop falling when a collision is made with a ground object
			if ( this.thing.posY < this.initialJumpHeight )
			{
				this.thing.posY += this.velocityY * ( ( time - this.lastUpdate ) / 1000 );
			}
			else 
			{
				if ( this.thing.posY > this.initialJumpHeight ) 
				{
					this.thing.posY = this.initialJumpHeight;
				}
				this.falling = false;
				
				if ( this.running ) this.thing.sprite.setAnim( 'run' );
				else this.idle(); 
			}
		}
		
		if ( this.running )
		{
			if ( this.runningForward ) background.update( this.velocityX, fps, canvas  );
			else 											 background.update( -this.velocityX, fps, canvas );
		}
		
		// Jumping
		if ( this.jumping )
		{
			this.thing.posY -= this.velocityY * ( ( time - this.lastUpdate ) / 1000 );
			if ( this.jumpTimer.isOver() )
			{
				this.jumping = false;
				this.jumpTimer.reset();
				
				this.fall();
			}
		}
		
		// Advancing Sprite	
		this.setSpriteAdvanceRate();
		
    if ( time - this.lastSpriteAdvance > this.spriteAdvanceRate ) 
		{
       this.thing.sprite.advance();
       this.lastSpriteAdvance = time;
    }

		this.lastUpdate = time;
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
	
	run: function ( forward )
	{
		if( !this.running )
		{
			if ( this.getCurAnimName() != 'run' && this.getCurAnimName() != 'jump' )
			{
				this.thing.sprite.setAnim( 'run' );
			}
			this.runningForward = forward;
			this.running        = true;
		}
	},
	
	idle: function ()
	{
		// Neutralize all other actions
		this.thing.sprite.setAnim( 'idle' );
		this.running = false;
	},
	
	jump: function ()
	{
		if ( !this.jumping && !this.falling )
		{
			this.thing.sprite.setAnim( 'jump' );
			this.jumpTimer.start();	
			this.initialJumpHeight = this.thing.posY;
			this.jumping           = true;
		}
	},
	
	fall: function ()
	{
		this.thing.sprite.setAnim( 'fall' );
		this.falling = true;
	}
};
