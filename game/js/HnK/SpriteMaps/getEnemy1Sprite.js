var getEnemy1Sprite = function ()
{
	enemy1spritesheet 		= new Image(),
	enemy1spritesheet.src = '../../image/enemy_1.png'; 
	
	idleAnimation = 
	[
		{ left: 7, top: 7, width: 32, height: 37 },
		{ left: 40, top: 7, width: 34, height: 37 },		
		{ left: 75, top: 6, width: 38, height: 38 },
		{ left: 114, top: 5, width: 40, height: 39 },
		{ left: 75, top: 6, width: 38, height: 38 },
		{ left: 40, top: 7, width: 34, height: 37 },
	];
	
	animations = new Array();
	animations['idle'] = idleAnimation;
	
	return new Sprite( enemy1spritesheet, animations );
};