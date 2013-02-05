var Background = function ()
{	
	this.backgroundImage.src = 'image/sky.png';
	return this;
};

Background.prototype =
{
	backgroundImage  : new Image(),
	backgroundOffset : 0,
	backgroundWidth  : 1000,
	curPosition      : 0,

	paint: function ( context ) 
	{
		
		context.save();
		context.translate( -this.backgroundOffset, 0 );
		context.drawImage( this.backgroundImage, 0, 0 );
		context.drawImage( this.backgroundImage, this.backgroundImage.width-2, 0);
		context.restore();
	},

	update: function ( velocity ) 
	{
		distanceMoved = velocity / fps;
		distanceMoved = Math.round( distanceMoved );
		if ( this.curPosition + distanceMoved > 0 && this.curPosition + distanceMoved < this.backgroundWidth )
		{
			enemyManager.backgroundUpdate( distanceMoved );
			bulletManager.backgroundUpdate( distanceMoved );
			explosionManager.backgroundUpdate( distanceMoved );
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