var Background = function ()
{	
	this.backgroundImage.src = 'image/sky.png';
	this.groundManager = new GroundManager();
	return this;
};

Background.prototype =
{
	backgroundImage  : new Image(),
	backgroundOffset : 0,
	backgroundWidth  : stageWidth,
	curPosition      : 0,
	groundManager    : null,
	paintReq         : 0,

	paint: function ( context ) 
	{
		if ( this.paintReq == 0 && this.backgroundImage.width > 0 ) this.paintReq = Math.ceil( ( stageWidth + canvas.width )  / ( this.backgroundImage.width - 2 ) );
		context.save();
		context.translate( -this.backgroundOffset, 0 );
		for ( var i = 0; i < this.paintReq; ++i )
		{
			context.drawImage( this.backgroundImage, ( this.backgroundImage.width - 2 ) * i, 0 );
		}
		context.restore();
		
		// draw groundManager
		this.groundManager.paint( context );
	},

	update: function ( velocity, context, time ) 
	{
		distanceMoved = velocity / fps;
		distanceMoved = Math.round( distanceMoved );
		if ( this.curPosition + distanceMoved > 0 && this.curPosition + distanceMoved < this.backgroundWidth )
		{
			enemyManager.backgroundUpdate( distanceMoved );
			bulletManager.backgroundUpdate( distanceMoved );
			explosionManager.backgroundUpdate( distanceMoved );
			this.groundManager.backgroundUpdate( distanceMoved );
			this.backgroundOffset += velocity / fps;
			this.curPosition += velocity / fps;						
		}
	},
	
	reset: function()
	{
		this.backgroundOffset = 0;
		this.curPosition      = 0;
		this.groundManager.reset();
	}
};