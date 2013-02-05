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
	deleteBullet: function ()
	{
		this.bullets.shift();
	},
	update: function ( context )
	{
		$.each( this.bullets, function () { this.update(); } );

		if ( this.bullets[0] != undefined )
		{
			if ( ( this.bullets[0].thing.posX - player.thing.posX ) > ( canvas.width - playerPosX ) )
			{
				this.deleteBullet();
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