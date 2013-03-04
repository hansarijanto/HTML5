var Bullet = function ( name, forward )
{
	if ( name == 'bullet_1' )
	{
		sprite = new getBulletSprite();
	}
	collision  = new Collision( sprite.getCurCell() );
	this.forward = forward;
	if( this.forward ) x = player.thing.posX + player.thing.collision.left / 2 + bulletOffsetX;
	else               x = player.thing.posX + player.thing.collision.left / 2 - bulletOffsetX;
	this.thing = new Thing( 'bullet', x, player.thing.posY + bulletOffsetY, sprite, 'bullet', collision );	
	return this;
};

Bullet.prototype = 
{
	thing     : null,
	velocityX : 350,
	forward   : true,
	
	update: function ()
	{
		if( this.forward ) this.thing.posX += this.velocityX / fps;
		else               this.thing.posX -= this.velocityX / fps;
	},
	
	paint: function ( context )
	{
		this.thing.paint( context, !this.forward );
	}
};