var GroundManager = function ()
{	
	this.grounds  = new Array();
	this.initialize();
	return this;
};

GroundManager.prototype =
{
	grounds  		 : null,
	
	create: function ( name, posX, posY )
	{
		this.grounds.push( new Ground( name, posX, posY ) );
	},
	update: function ( context, time )
	{
		$.each( this.grounds, function () { this.update( context, time ); } );
	},
	paint: function ( context )
	{
		$.each( this.grounds, function () { this.paint( context ); } );
	},
	reset: function ()
	{
		$.each( this.grounds, function () { this.reset(); } );
	},
	backgroundUpdate: function ( distanceMoved )
	{
		$.each( this.grounds, function () { this.thing.backgroundUpdate( -distanceMoved ); } );
	},
	getGrounds: function ()
	{
		return this.grounds;
	},
	initialize: function ()
	{
		this.create( 'grass', 0		, groundY );
		this.create( 'grass', 500 , groundY );
		this.create( 'grass', 1100 , groundY );
		this.create( 'grass', 1100 , groundY - 70 );
		this.create( 'grass', 1700 , groundY );
		this.create( 'grass', 2200 , groundY );
	},
};