var Background = function ()
{	
	this.backgroundImage.src = '../../image/sky.png';
	return this;
};

Background.prototype =
{
	backgroundImage  : new Image(),
	backgroundOffset : 0,
	backgroundWidth  : 1000,
	curPosition      : 0,

	draw: function ( context ) 
	{
		
		context.save();
		context.translate( -this.backgroundOffset, 0 );
		context.drawImage( this.backgroundImage, 0, 0 );
		context.drawImage( this.backgroundImage, this.backgroundImage.width-2, 0);
		context.restore();
		
		//Draw the entire level solution each frame( looking for a better solution )
		
		// width = 0;
		// context.save();
		// context.translate( -this.backgroundOffset, 0 );
		// for ( i = 0; i < 10; i++ )
		// {
		// 	context.drawImage( this.backgroundImage, width, 0 );
		// 	width += this.backgroundImage.width - 2;
		// }
		// context.restore();
	},

	update: function ( velocity, fps, canvas, enemy ) 
	{
		distanceMoved = velocity / fps;
		distanceMoved = Math.round( distanceMoved );
		if ( this.curPosition + distanceMoved > 0 && this.curPosition + distanceMoved < this.backgroundWidth )
		{
			enemy.backgroundUpdate( -distanceMoved );
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