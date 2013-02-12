// Controls
var attackTimer = new AnimationTimer( 300 );
attackTimer.start();

$(document).keydown(function(event)	{
    keys[event.which] = true;
  }).keyup(function(event){
    delete keys[event.which];
  });

window.addEventListener("keydown", function(e) 
{	
	if( !player.hit && player.alive )
	{
		if( e.keyCode == 38 )
		{
			player.jump();
		}
		if( e.keyCode == 32 )
		{
			if( attackTimer.isOver() && !player.attacking )
			{
				player.attack();
				player.attacking = true;
				attackTimer.reset();
				attackTimer.start();
			}
		}
	}
}, true);

window.addEventListener("keyup", function(e) 
{
	if( !player.hit && player.alive )
	{
		if( e.keyCode == 37 || e.keyCode == 39 )
		{
			player.idle();
		}
		if( e.keyCode == 32 )
		{
			player.attacking = false;
		}
	}
}, true);
