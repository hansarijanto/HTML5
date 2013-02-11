// Controls

$(document).keydown(function(event)	{
    keys[event.which] = true;
  }).keyup(function(event){
    delete keys[event.which];
  });

window.addEventListener("keydown", function(e) 
{	
	if( !player.hit && player.alive )
	{
		// if( e.keyCode == 39 )
		// {
		// 	player.run( true );
		// }
		// if( e.keyCode == 37 )
		// {
		// 	player.run( false );
		// }
		if( e.keyCode == 38 )
		{
			player.jump();
		}
		if( e.keyCode == 32 )
		{
			player.attack();
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
	}
}, true);
