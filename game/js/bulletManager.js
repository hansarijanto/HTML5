var BulletManager = function ()
{	
	this.bulletSprite = new getBulletSprite();
	this.bullets      = new Array();
	return this;
};

BulletManager.prototype =
{
	bulletSprite : null,
	bullets  		 : null,
	
	createBullet: function ()
	{
		this.bullets.push( new Bullet( 'bullet', player.thing.posX + bulletOffsetX, player.thing.posY + bulletOffsetY, this.bulletSprite, 'bullet' ) );
	},
	update: function ( context )
	{
		$.each( this.bullets, function () { this.update(); } );

		if ( this.bullets[0] != undefined )
		{
			if ( ( this.bullets[0].thing.posX - player.thing.posX ) > ( canvas.width - playerPosX ) )
			{
				this.bullets.shift();
			}
		}
	},
	paint: function ( context )
	{
		$.each( this.bullets, function () { this.paint( context ); } );
	},
	backgroundUpdate: function ( distanceMoved )
	{
		$.each( this.bullets, function () { this.backgroundUpdate( -distanceMoved ); } );
	}
};