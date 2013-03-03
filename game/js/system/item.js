var Bullet = function ( name )
{
	if ( name == 'bullet_1' )
	{
		sprite = new getBulletSprite();
	}
	collision  = new Collision( sprite.getCurCell() );
	this.thing = new Thing( 'bullet', player.thing.posX + bulletOffsetX, player.thing.posY + bulletOffsetY, sprite, 'bullet', collision );	
	return this;
};

Bullet.prototype = 
{
	thing     : null,
	velocityX : 350,
	
	update: function ()
	{
		this.thing.posX += this.velocityX / fps;
	},
	
	paint: function ( context )
	{
		this.thing.paint( context );
	}
};