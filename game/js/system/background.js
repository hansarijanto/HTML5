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

	paint: function ( context ) 
	{
		
		context.save();
		context.translate( -this.backgroundOffset, 0 );
		context.drawImage( this.backgroundImage, 0, 0 );
		context.drawImage( this.backgroundImage, this.backgroundImage.width-2, 0);
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
			this.backgroundOffset = this.backgroundOffset < canvas.width ? this.backgroundOffset + velocity / fps : 0;
			this.curPosition += velocity / fps;						
		}
	},
	
	reset: function()
	{
		this.backgroundOffset = 0;
		this.curPosition      = 0;
	}
};