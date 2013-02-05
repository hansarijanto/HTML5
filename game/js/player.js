var Player = function () 
{	
	sprite    			= new getPlayerSprite();
	collision       = new Collision( sprite.getCurCell() );
	this.thing      = new Thing(  'player', playerPosX, playerPosY, sprite, 'player', collision );	
	this.jumpTimer  = new AnimationTimer( 500 );
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
	
	hp 									: 100,
	
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

	update: function ( context, time )
	{
		if ( this.alive )
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
				
					if ( this.running ) this.thing.sprite.setAnim( 'run', true );
					else this.idle(); 
				}
			}
		
			// Running		
			if ( this.running )
			{
				if ( this.runningForward ) background.update(  this.velocityX );
				else 											 background.update( -this.velocityX );
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
		
			// Hit
			if ( this.hit )
			{
				if ( this.hitDirection == 'right' )
				{
					background.update( -this.velocityX );
				}
				else if ( this.hitDirection == 'left' )
				{
					background.update( this.velocityX );
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
				this.deadTimer.reset();
				this.reset();
				enemyManager.reset();
				explosionManager.reset();
				bulletManager.reset();
				background.reset();				
			}
		}
				
		// Advancing Sprite	
		this.setSpriteAdvanceRate();
		
		if ( this.lastSpriteAdvance == 0 ) this.lastSpriteAdvance = time;
    if ( time - this.lastSpriteAdvance > this.spriteAdvanceRate ) 
		{
			 //TODO:: replicate code in enemy.js. move the function to thing.js
       this.thing.sprite.advance();
			 this.thing.collision.update( this.thing.sprite.getCurCell() );
       this.lastSpriteAdvance = time;
    }

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
				this.alive = false;
				this.thing.sprite.setAnim( 'dead', true );
				this.deadTimer.start();
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
		this.thing.posY = playerPosY;
		this.alive = true;
		this.idle();
	}
};
