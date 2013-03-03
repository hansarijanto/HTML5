var Background = function ( context )
{	
	this.backgroundImage.onload = function() 
	{ 
		background.imageWidth = background.backgroundImage.width - 2;
		totalImageWidth = 0;
		while( totalImageWidth < canvasWidth )
		{
			totalImageWidth += background.imageWidth;
			background.imageCount += 1;
		}
		background.paint( context ); 
	};
	this.backgroundImage.src = 'image/sky.png';
	this.groundManager = new GroundManager();
	return this;
};

Background.prototype =
{
	backgroundImage  : new Image(),
	imageWidth       : 0,
	backgroundOffset : 0,
	curPosition      : 0,
	groundManager    : null,
	imageCount       : 0,

	paint: function ( context ) 
	{
		for ( var i = 0; i < this.imageCount; ++i )
		{
			context.drawImage( this.backgroundImage, ( this.imageWidth ) * i, 0 );
		}
		
		// draw groundManager
		this.groundManager.paint( context );
	},

	update: function ( velocity, context ) 
	{
		distanceMoved = velocity / fps;
		distanceMoved = Math.round( distanceMoved );
		if ( player.thing.posX + distanceMoved > 0 && player.thing.posX + distanceMoved < ( canvasWidth - player.thing.collision.left ) )
		{
			player.thing.posX += distanceMoved;
			
			if ( player.thing.posX + distanceMoved > wrapperWidth / 2 && player.thing.posX + distanceMoved < ( canvasWidth - wrapperWidth / 2  ) ) scrollWrapper( distanceMoved, 0 );		
		}
	},
	
	reset: function()
	{
		this.backgroundOffset = 0;
		this.curPosition      = 0;
		this.groundManager.reset();
	}
};