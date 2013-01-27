var jump_timer = new AnimationTimer( 300 );
// Listeners................................................

//doesnt work for IE must use attachEvent
window.addEventListener("keydown", function(e) {
    if( e.keyCode == 39 )
		{
			walking = 'right';
		}
		else if( e.keyCode == 37 )
		{
			walking = 'left';
		}
		else if( e.keyCode == 32 && !jumping && sprite.top == GROUND )
		{
			jump_timer.start();
			jumping = true;
		}
  }, true);

window.addEventListener("keyup", function(e) {
    if( e.keyCode == 39 || e.keyCode == 37 )
		{
			sprite.painter.reset();
			walking = null;
		}
		// else if( e.keyCode == 32 && )
		// {
		// 	jumping = false;
		// }
  }, true);