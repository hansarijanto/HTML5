var EnemyManager = function ()
{	
	this.enemies  = new Array();
	this.hitTimer = new AnimationTimer( 200 );
	this.initializeEnemies();
	return this;
};

EnemyManager.prototype =
{
	enemies  		 : null,
	hitTimer     : null,
	
	createEnemy: function ( name, posX, posY )
	{
		this.enemies.push( new Enemy( name, posX, posY ) );
	},
	update: function ( context, time )
	{
		$.each( this.enemies, function () { this.update( context, time ); } );
	},
	paint: function ( context )
	{
		$.each( this.enemies, function () { this.paint( context ); } );
	},
	reset: function ()
	{
		$.each( this.enemies, function () { this.reset(); } );
	},
	backgroundUpdate: function ( distanceMoved )
	{
		$.each( this.enemies, function () { this.thing.backgroundUpdate( -distanceMoved ); } );
	},
	getEnemies: function ()
	{
		return this.enemies;
	},
	initializeEnemies: function ()
	{
		this.createEnemy( 'enemy1', enemyPosX, enemyPosY );
		this.createEnemy( 'enemy1', enemyPosX + 300, enemyPosY );
		this.createEnemy( 'enemy1', enemyPosX + 600, enemyPosY );
		this.createEnemy( 'enemy1', enemyPosX + 900, enemyPosY );
	}
};