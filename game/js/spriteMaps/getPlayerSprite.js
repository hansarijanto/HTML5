var getPlayerSprite = function ()
{
	spritesheet 		= new Image(),
	spritesheet.src = 'image/x.png'; 
	
	runningAnimation = 
	[
	  { left: 319, top: 19, width: 30, height: 34 },
		{ left: 350, top: 19, width: 20, height: 34 },
		{ left: 371, top: 18, width: 23, height: 34 },
		{ left: 394, top: 19, width: 32, height: 34 },
		{ left: 426, top: 19, width: 34, height: 34 },
		{ left: 460, top: 19, width: 29, height: 34 },
		{ left: 486, top: 19, width: 25, height: 34 },
		{ left: 511, top: 18, width: 25, height: 34 },
		{ left: 539, top: 19, width: 30, height: 34 },
		{ left: 569, top: 19, width: 35, height: 34 },
		{ left: 604, top: 19, width: 29, height: 34 },
	];
	idleAnimation = 
	[
		{ left: 213, top: 18, width: 30, height: 34 },
		{ left: 213, top: 18, width: 30, height: 34 },
		{ left: 213, top: 18, width: 30, height: 34 },
		{ left: 213, top: 18, width: 30, height: 34 },
		{ left: 213, top: 18, width: 30, height: 34 },
		{ left: 213, top: 18, width: 30, height: 34 },
		{ left: 213, top: 18, width: 30, height: 34 },
		{ left: 213, top: 18, width: 30, height: 34 },
		{ left: 213, top: 18, width: 30, height: 34 },
		{ left: 213, top: 18, width: 30, height: 34 },
		{ left: 213, top: 18, width: 30, height: 34 },
		{ left: 213, top: 18, width: 30, height: 34 },
		{ left: 213, top: 18, width: 30, height: 34 },
		{ left: 213, top: 18, width: 30, height: 34 },
		{ left: 213, top: 18, width: 30, height: 34 },						
		{ left: 247, top: 18, width: 30, height: 34 },
		{ left: 281, top: 18, width: 30, height: 34 },
	];
	jumpAnimation = 
	[
		{ left: 134, top: 72, width: 24, height: 38 },	
		// Diff Jumping Sprite
		// { left: 55, top: 64, width: 19, height: 46 },
	];
	fallAnimation = 
	[
		{ left: 102, top: 68, width: 27, height: 42 },	
		// Attacking Falling Sprite
		// { left: 152, top: 120, width: 30, height: 38 },
	];
	hitAnimation =
	[
		{ left: 72, top: 318, width: 29, height: 34 },
		{ left: 105, top: 318, width: 32, height: 34 },
	];
	deadAnimation =
	[
		{ left: 105, top: 318, width: 32, height: 34 },
	];
	
	animations = new Array();
	animations['run' ] = runningAnimation;
	animations['idle'] = idleAnimation;
	animations['fall'] = fallAnimation;
	animations['jump'] = jumpAnimation;
	animations['hit' ] = hitAnimation;
	animations['dead'] = deadAnimation;
	
	return new Sprite( spritesheet, animations );
};