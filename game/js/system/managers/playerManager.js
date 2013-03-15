var PlayerManager = function ( playerId )
{	
	this.otherPlayers  = new Array();
	this.player = new Player( playerId, 0, 0 );
	return this;
};

PlayerManager.prototype =
{
	otherPlayers : null,
	player : null,
	
	createPlayer: function ( playerId, posX, posY )
	{
		// this.otherPlayers.push( new Player( playerId, posX, posY ) );
		this.otherPlayers[ playerId ] =  new Player( playerId, posX, posY );
	},
	removePlayer: function ( playerId )
	{
		delete this.otherPlayers[ playerId ];
	},
	update: function ( context, time )
	{
		this.player.update( context, time );
	},
	paint: function ( context )
	{
		this.player.paint( context );
		$.each( this.otherPlayers, function (key,val) { if( val != undefined ) this.paint(context) } );
	},
	reset: function ()
	{
		this.player.reset();
		// $.each( this.players, function () { this.reset(); } );
	},
	getOtherPlayers: function ()
	{
		return this.otherPlayers;
	}
};