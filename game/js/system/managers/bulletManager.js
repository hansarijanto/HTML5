var BulletManager = function ()
{	
	this.bullets      = new Array();
	return this;
};

BulletManager.prototype =
{
	bulletSprite : null,
	bullets  		 : null,
	
	createBullet: function ( forward )
	{
		this.bullets.push( new Bullet( 'bullet_1', forward ) );
	},
	deleteBullet: function ()
	{
		this.bullets.shift();
	},
	update: function ( context )
	{
		$.each( this.bullets, function () { this.update(); } );

		if ( this.bullets[0] != undefined )
		{
			if( this.bullets[0].forward )
			{
				if ( ( this.bullets[0].thing.posX ) > ( wrapperWidth + wrapper.scrollLeft ) ) this.deleteBullet();
			}
			else
			{
				if ( ( this.bullets[0].thing.posX ) < ( wrapper.scrollLeft ) ) this.deleteBullet();
			}
		}
	},
	paint: function ( context )
	{
		$.each( this.bullets, function () { this.paint( context ); } );
	},
	backgroundUpdate: function ( distanceMoved )
	{
		$.each( this.bullets, function () { this.thing.backgroundUpdate( -distanceMoved ); } );
	},
	getBullets: function ()
	{
		return this.bullets;
	},
	reset: function ()
	{
		this.bullets = new Array();
	}
};