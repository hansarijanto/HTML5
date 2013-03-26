var Server;

function log( text ) {
	$log = $('#log');
	//Add text to log
	$log.append(($log.val()?"\n":'')+text);
	//Autoscroll
	$log[0].scrollTop = $log[0].scrollHeight - $log[0].clientHeight;
}

function send( text ) {
	Server.send( 'message', text );
}

$(document).ready(function() {
	log('Connecting...');
	Server = new FancyWebSocket('ws://127.0.0.1:9300');
	// Server = new FancyWebSocket('ws://129.97.125.81:9300');

	$('#message').keypress(function(e) {
		if ( e.keyCode == 13 && this.value ) {
			log( 'You: ' + this.value );
			send( this.value );

			$(this).val('');
		}
	});

	//Let the user know we're connected
	Server.bind('open', function() {
		send( "~:initializePlayer:"+player.playerId );
		log( "Player "+player.playerId+" has Connected" );
	});

	//OH NOES! Disconnection occurred.
	Server.bind('close', function( data ) {
		log( "Server Disconnected." );
	});

	//Log any messages sent from server
	Server.bind('message', function( message ) {
		if( message.substring(0,1) == '~' )
		{
			var message   = message.split(":");	
			var m_command = message[1];
			var m_value   = message[2];
			
			if( m_command == 'addPlayer' )
			{
				log( "Player "+m_value+" has Connected" );
				playerManager.createPlayer( m_value, 0, 0 );
			}
			else if( m_command == 'removePlayer')
			{
				log( "Player "+m_value+" has Disconnected" );
				playerManager.removePlayer( m_value );
			}
			else if( m_command == 'updatePlayer')
			{
				var m_value_arr = m_value.split( "," );
				var player_id = m_value_arr[0];
				var posX      = m_value_arr[1];
				var posY      = m_value_arr[2];
				var rf        = m_value_arr[3];
				var animName  = m_value_arr[4];
				playerManager.updateOtherPlayer( player_id, posX, posY, rf, animName );
			}
		}
		else
		{
			log( message );
		}
	});

	Server.connect();
	window.requestNextAnimationFrame( animate );
});