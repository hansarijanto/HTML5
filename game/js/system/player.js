var Player = function () 
{	
	sprite    			= new getPlayerSprite();
	collision       = new Collision( sprite.getCurCell() );
	this.thing      = new Thing(  'player', playerPosX, groundY - playerGroundOffset, sprite, 'player', collision );	
	this.jumpTimer  = new AnimationTimer( 500, AnimationTimer.makeEaseOut(1) );
	this.fallTimer  = new AnimationTimer( 500, AnimationTimer.makeEaseIn(1) );
	this.hitTimer   = new AnimationTimer( 300 );
	this.deadTimer  = new AnimationTimer( 1000 );
	
	return this;
};

Player.prototype = 
{
	thing               : null,
	lastUpdate					: 0,
	hit		 							: false,
	hitDirection        : null,
	alive               : true,
	
	spriteAdvanceRate   : 100,
	
	hp 									: 100,
	
	velocityY           : 170,
	velocityX           : 170,

	jumping             : false,
	jumpTimer           : null,
	initialJumpHeight   : 0,
	lastJump            : 0,
	
	falling							: false,
	lastFall            : 0,
	
	running             : false,
	runningForward      : true,

	update: function ( context, time )
	{
		if ( this.alive )
		{
			// Falling
			if ( this.falling )
			{
				// Need to investigate Animation Timer more (Ease in)
				var elapsed = this.fallTimer.getElapsedTime(),
						diff    = elapsed - this.lastFall;
				this.thing.posY += Math.round( this.velocityY * ( diff / 1000 ) );
				this.lastFall = elapsed;
					
					if( this.thing.posY > canvasHeight ) 
					{
						this.hp = 0;
						this.die();
					}
			}
		
			// Running		
			if ( this.running )
			{
				if ( this.runningForward ) background.update(  this.velocityX, context, time );
				else 											 background.update( -this.velocityX, context, time );
			}
		
			// Jumping
			if ( this.jumping )
			{
				// Need to investigate Animation Timer more (Ease out)
				var elapsed = this.jumpTimer.getElapsedTime(),
						diff    = elapsed - this.lastJump;
						
				this.thing.posY -= Math.round( this.velocityY * ( diff / 1000 ) );
				this.lastJump = elapsed;
				if ( diff < 0 )
				{
					this.stopJumping();
				}
			}
		
			// Hit
			if ( this.hit )
			{
				if ( this.hitDirection == 'right' )
				{
					background.update( -this.velocityX, context, time );
				}
				else if ( this.hitDirection == 'left' )
				{
					background.update( this.velocityX, context, time );
				}
			
				if ( this.hitTimer.isOver() )
				{
					this.hit = false;
					this.hitTimer.reset();
					this.idle();
				}
			}
		}
		else
		{
			if ( this.deadTimer.isOver() )
			{
				this.thing.sprite.setAnim( 'fall', true );	
				this.deadTimer.reset();
				this.reset();
				enemyManager.reset();
				explosionManager.reset();
				bulletManager.reset();
				background.reset();	
			}
		}
				
		this.thing.advanceSprite( time, this.spriteAdvanceRate );
		
		this.lastUpdate = time;
	},
	
	paint: function ( context )
	{		
		this.thing.paint( context );
		
		// TODO::testing purpose drawing health bar
		context.save();
		context.fillStyle = "black";
	  context.font = "bold 16px Arial";
	  context.fillText("Health "+this.hp, 100, 100);
		context.restore();
	},
	
	getCurAnimName: function ()
	{
		return this.thing.sprite.curAnimName;
	},
	
	run: function ( forward )
	{
		if( !this.running )
		{
			if ( this.getCurAnimName() != 'run' && this.getCurAnimName() != 'jump' && this.getCurAnimName() != 'fall' && this.getCurAnimName() != 'jumpAtk' && this.getCurAnimName() != 'fallAtk' )
			{
				this.thing.sprite.setAnim( 'run', true );
			}
			this.runningForward = forward;
			this.running        = true;
		}
	},
	
	attack: function ()
	{
		if( this.jumping )
		{
			if ( this.getCurAnimName() != 'jumpAtk' )
			{
				this.thing.sprite.setAnim( 'jumpAtk', false );
			}
		}
		else if( this.falling )
		{
			if ( this.getCurAnimName() != 'fallAtk' )
			{
				this.thing.sprite.setAnim( 'fallAtk', false );
			}
		}
		else if( this.running )
		{
			if ( this.getCurAnimName() != 'runAtk' )
			{
				this.thing.sprite.setAnim( 'runAtk', false );
			}
		}
		else
		{
			if ( this.getCurAnimName() != 'idleAtk' )
			{
				this.thing.sprite.setAnim( 'idleAtk', true );
			}
		}
		//adding new bullet
		bulletManager.createBullet();
	},
	
	idle: function ()
	{
		// Neutralize all other actions
		this.running = false;
		if( !this.jumping && !this.falling )
		{
			this.thing.sprite.setAnim( 'idle', true );
		}
	},
	
	jump: function ()
	{
		if ( !this.jumping && !this.falling )
		{
			this.thing.sprite.setAnim( 'jump', true );
			this.jumpTimer.start();	
			this.initialJumpHeight = this.thing.posY;
			this.jumping           = true;
		}
	},
	
	fall: function ()
	{
		this.thing.sprite.setAnim( 'fall', true );
		this.falling = true;
		this.fallTimer.start();
	},
	
	damage: function ( direction )
	{
		if ( !this.hit )
		{
			this.hitDirection = direction;
			this.hp -= 5;
			
			if( this.hp < 0 ) this.hp = 0;
			
			if ( this.hp <= 0 && this.alive )
			{
				this.die();
			}
			else
			{
				this.thing.sprite.setAnim( 'hit', true );
				this.hitTimer.start();
				this.hit = true;
				this.running = false;
			}
		}
	},
	reset: function ()
	{
		this.hp = 100;
		this.thing.posX = playerPosX;
		this.thing.posY = groundY - playerGroundOffset;
		this.stopFalling();
		this.stopJumping();
		this.alive = true;
		this.idle();
	},
	die: function ()
	{
		this.alive = false;
		this.thing.sprite.setAnim( 'dead', true );
		this.deadTimer.start();
	},
	stopFalling: function ()
	{
		this.falling = false;
		this.jumpTimer.stop();
		this.jumpTimer.reset();
		this.lastFall = 0;
	},
	stopJumping: function ()
	{
		this.jumping = false;
		this.jumpTimer.stop();
		this.jumpTimer.reset();
		this.fall();
		this.lastJump = 0;
	}
};
