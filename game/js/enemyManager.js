var EnemyManager = function ()
{	
	this.enemies = new Array();
	this.createEnemy( 'enemy1' );
	return this;
};

EnemyManager.prototype =
{
	enemies  		 : null,
	
	createEnemy: function ( name )
	{
		this.enemies.push( new Enemy( name ) );
	},
	update: function ( context, time )
	{
		$.each( this.enemies, function () { this.update( context, time ); } );
	},
	paint: function ( context )
	{
		$.each( this.enemies, function () { this.paint( context ); } );
	},
	backgroundUpdate: function ( distanceMoved )
	{
		$.each( this.enemies, function () { this.backgroundUpdate( -distanceMoved ); } );
	},
	getEnemies: function ()
	{
		return this.enemies;
	}
};