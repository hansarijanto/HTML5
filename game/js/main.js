var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),

    lastTime = 0,
    lastFpsUpdate = { time: 0, value: 0 },
    fps = 60;

function calculateFps(now) {
   var fps = 1000 / (now - lastTime);
   lastTime = now;
   return fps; 
}

// Animation.....................................................

function animate(time) {
	
	if (time === undefined) {
     time = +new Date;
  }

  fps = calculateFps(time);

	context.clearRect(0,0,canvas.width,canvas.height);
  drawBackground();
	
	updateBackground(walking); 

	sprite.update(context, time);
	
	if( jumping || falling ) 
	{
		sprite.painter = jumping_painter;
	}
	else if( walking != null ) 
	{
		sprite.painter = runner_painter;
	}
	else 				 
	{
	sprite.painter = idle_painter;
	}
	
	sprite.paint(context);

	window.requestNextAnimationFrame(animate);
}

// Initialization................................................

context.strokeStyle = 'lightgray';
context.lineWidth = 0.5;

window.requestNextAnimationFrame(animate);
