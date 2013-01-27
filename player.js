var spritesheet = new Image(),
		GROUND = 380,
		JUMP_HEIGHT = 340,
		jumping = false,
		falling = false,
		walking = null,
		runnerCells = [
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
		],
		idleCells = [
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
		  { left: 213, top: 18, width: 30, height: 34 },
			{ left: 213, top: 18, width: 30, height: 34 },
			{ left: 213, top: 18, width: 30, height: 34 },
			{ left: 213, top: 18, width: 30, height: 34 },
		  { left: 213, top: 18, width: 30, height: 34 },
			{ left: 247, top: 18, width: 30, height: 34 },
			{ left: 281, top: 18, width: 30, height: 34 },
		],
		jumpCells = [
			{ left: 152, top: 120, width: 30, height: 38 },
		];

// Behaviors.................................................

    spriteAnimationLoop = {
       lastAdvance: 0,
       PAGEFLIP_INTERVAL: 100,

       execute: function (sprite, context, time) {
          if (time - this.lastAdvance > this.PAGEFLIP_INTERVAL) {
             sprite.painter.advance();
             this.lastAdvance = time;
          }
       }
    },

		jump = {
		   lastJump: 0,
			 height: JUMP_HEIGHT,
		       
		       execute: function (sprite, context, time) {
		         if ( jumping ) 
						 {
							
		           sprite.top -= sprite.velocityY *
		                          ((time - this.lastJump) / 1000);
									
							 if ( jump_timer.isOver() )
							 {
							  	jumping = false;
									falling = true;
							 }
		         }
		         this.lastJump = time;
		       }
		    },
		
		fall = {
				lastFall: 0,
		        execute: function (sprite, context, time) {
								if ( falling ) 
								{
									sprite.top += sprite.velocityY * ((time - this.lastFall) / 1000);
									if( sprite.top > GROUND )
									{
										sprite.top = GROUND;
										falling = false;
									}
								}
								this.lastFall = time;
				     	}
				    },
		

    // moveRightToLeft = {
    //    lastMove: 0,
    //    
    //    execute: function (sprite, context, time) {
    //      if (this.lastMove !== 0) {
    //        sprite.left += sprite.velocityX *
    //                       ((time - this.lastMove) / 1000); 
    // 
    //        if (sprite.left > canvas.width) {
    //           sprite.left = 0;
    //        }
    //      }
    //      this.lastMove = time;
    //    }
    // },

// Painters....................................................

    idle_painter = new SpriteSheetPainter(idleCells);

		runner_painter = new SpriteSheetPainter(runnerCells);

		jumping_painter = new SpriteSheetPainter(jumpCells);

// Sprite....................................................		

    sprite = new Sprite('runner', idle_painter, [ spriteAnimationLoop, jump, fall ]);

// Initialization................................................

		spritesheet.src = 'image/x.png';
		
		sprite.velocityY = 200;
		sprite.left = 500;
		sprite.top = GROUND;