var ExplosionManager = function ()
{	
	this.explosions     = new Array();
	return this;
};

ExplosionManager.prototype =
{
	explosions  	    : null,
	explosionToDelete : 0,
	
	createExplosion: function ( name, posX, posY )
	{
		var newExplosion = new Explosion( name, posX, posY )
		newExplosion.explosionTimer.start();
		this.explosions.push( newExplosion );
	},
	deleteExplosion: function ()
	{
		this.explosions.shift();
	},
	update: function ( context, time )
	{
		$.each( this.explosions, function () { this.update( context, time ); } );
		if ( this.explosionToDelete > 0 )
		{	
			for ( var i = 0; i < this.explosionToDelete; ++i )
			{
				this.deleteExplosion();
			}
			
			this.explosionToDelete = 0;
		}
	},
	paint: function ( context )
	{
		$.each( this.explosions, function () { this.paint( context ); } );
	},
	backgroundUpdate: function ( distanceMoved )
	{
		$.each( this.explosions, function () { this.backgroundUpdate( -distanceMoved ); } );
	},
	getExplosions: function ()
	{
		return this.explosions;
	},
	reset: function ()
	{
		this.explosions = new Array();
	}
};