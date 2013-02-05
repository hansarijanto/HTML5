var getExplosion1Sprite = function ()
{	
	idleAnimation = 
	[
		{ left: 5, top: 45, width: 32, height: 27 },
		{ left: 45, top: 52, width: 32, height: 20 },
		{ left: 93, top: 53, width: 32, height: 16 },
	];
	animations = new Array();
	animations['idle'] = idleAnimation;
	
	return new Sprite( explosion1Spritesheet, animations );
};