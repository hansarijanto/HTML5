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
		
		//Updating other player's sprites
		for ( var key in this.otherPlayers ) 
		{
		   this.otherPlayers[key].thing.advanceSprite( time, this.otherPlayers[key].spriteAdvanceRate );
		}
		
		//Updating player on server... TODO:: a try and catch must be placed to prevent fancywebsocket.js from creating a DOM error
		try
			{
				send( "~:updatePlayer:"+this.player.playerId+","+this.player.thing.posX+","+this.player.thing.posY+","+this.player.runningForward+","+this.player.thing.sprite.curAnimName );
			}
		catch(err)
			{

			}
	},
	updateOtherPlayer: function ( playerId, posX, posY, rf, animName )
	{
		this.otherPlayers[ playerId ].thing.posX = posX;
		this.otherPlayers[ playerId ].thing.posY = posY;
		this.otherPlayers[ playerId ].runningForward = (rf == 'true');
		if ( this.otherPlayers[ playerId ].getCurAnimName() != animName ) this.otherPlayers[ playerId ].thing.sprite.setAnim( animName, true );
	},
	paint: function ( context )
	{
		context.save();	
		// TODO::testing purpose drawing health bar
		context.fillStyle = "black";
	  context.font = "bold 16px Arial";
	  context.fillText("Health "+player.hp, wrapper.scrollLeft + 100, wrapper.scrollTop + 100);
		context.restore();
		
		this.player.paint( context );
		
		for ( var key in this.otherPlayers ) 
		{
		   this.otherPlayers[key].paint( context );
		}
		// $.each( this.otherPlayers, function (key,val) { if( val != undefined ) this.paint(context) } );
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