var getGroundSprite = function ()
{	
	idleAnimation = 
	[
		{ left: 0, top: 0, width: 500, height: 52 },
	];
	animations = new Array();
	animations['idle'] = idleAnimation;
	
	return new Sprite( grass1Spritesheet, animations );
};