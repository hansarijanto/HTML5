var getBulletSprite = function ()
{	
	idleAnimation = 
	[
		{ left: 5, top: 377, width: 8, height: 6 },
	];
	animations = new Array();
	animations['idle'] = idleAnimation;
	
	return new Sprite( spritesheet, animations );
};