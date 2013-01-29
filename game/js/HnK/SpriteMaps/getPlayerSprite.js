var getPlayerSprite = function ()
{
	spritesheet 		= new Image(),
	spritesheet.src = '../../image/x.png'; 
	
	runningAnimation = 
	[
	  { left: 319, top: 19, width: 30, height: 34 },
		{ left: 350, top: 19, width: 20, height: 34 },
		{ left: 371, top: 19, width: 23, height: 34 },
		{ left: 394, top: 19, width: 32, height: 34 },
		{ left: 426, top: 19, width: 34, height: 34 },
		{ left: 460, top: 19, width: 29, height: 34 },
		{ left: 486, top: 19, width: 25, height: 34 },
		{ left: 511, top: 19, width: 25, height: 34 },
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
		{ left: 152, top: 120, width: 30, height: 38 },
	];
	
	animations = new Array();
	animations['run' ] = runningAnimation;
	animations['idle'] = idleAnimation;
	animations['jump'] = jumpAnimation;
	 // idle: { name: 'idle', content: idleAnimation }, jump: { name: 'jump', content: jumpAnimation } };
	// animations = { run: { name: 'run', content: runningAnimation }, idle: { name: 'idle', content: idleAnimation }, jump: { name: 'jump', content: jumpAnimation } };
	
	return new Sprite( spritesheet, animations );
};