var Thing = function ( name, posX, posY, sprite, type, collision ) 
{	
	if ( name !== undefined ) this.name = name;
	if ( posX !== undefined ) this.posX = posX;
	if ( posY !== undefined ) this.posY = posY;
	
	this.type       = type;
	this.sprite			= sprite;	
	this.collision = collision;
	
	return this;
};

Thing.prototype = 
{
	name     	 : "noName",
	type			 : "noType",
	posX     	 : 0,
	posY     	 : 0,
	sprite   	 : null,
	collision  : null,
	
	lastSpriteAdvance		: 0,
	
	paint: function ( context, inverse )
	{
		x = this.posX;
		
		if( inverse ) 
		{
			context.save();	
			context.translate( canvasWidth, 0 );
			context.scale( -1, 1 )
			x = canvasWidth - x - this.collision.left;
		}
		
		this.sprite.paint( context, x, this.posY );
				
		//painting the collider
		if ( debug == true )
		{
			context.fillStyle = "rgba(0,0,0,.2)";
			if ( this.collision != undefined ) context.fillRect ( x, this.posY + this.collision.yOffset , this.collision.left ,this.collision.top - this.collision.yOffset );
		}
		if( inverse ) context.restore();
	},
	advanceSprite: function ( time, spriteAdvanceRate )
	{	
		if ( this.lastSpriteAdvance == 0 ) this.lastSpriteAdvance = time;
    if ( time - this.lastSpriteAdvance > spriteAdvanceRate ) 
		{
       this.sprite.advance();
			 //TODO:: this is causing some lags when changing sprites due to ground collision issues fix needed
			 if( this.collision != undefined ) this.collision.update( this.sprite.getCurCell() );
       this.lastSpriteAdvance = time;
    }
	},	
	backgroundUpdate: function ( distanceMoved )
	{
		this.posX += distanceMoved;
	},
};
