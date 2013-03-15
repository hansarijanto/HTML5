<?php
// prevent the server from timing out
set_time_limit(0);
$players = array();

// include the web sockets server script (the server is started at the far bottom of this file)
require 'class.PHPWebSocket.php';

// when a client sends data to the server
function wsOnMessage($clientID, $message, $messageLength, $binary) {
	global $Server;
	global $players;
	$ip = long2ip( $Server->wsClients[$clientID][6] );

	// check if message length is 0
	if ($messageLength == 0) {
		$Server->wsClose($clientID);
		return;
	}
	
	if( $message[0] == '~' )
	{
		$m_array   = explode( ':', $message );
		$m_command = $m_array[ 1 ];
		$m_value   = $m_array[ 2 ];
		if( $m_command == 'initializePlayer' )
		{ 
			foreach ( $Server->wsClients as $id => $client )
			{
				if ( $id != $clientID )
				{
					$Server->wsSend($id, "~:addPlayer:$m_value");
				}
				else
				{
					foreach( $players as $p_id => $value )
					{
						$Server->wsSend($id, "~:addPlayer:$value");
					}
				}
			}
			$players[ $clientID ] = $m_value ;
		}
		else if( $m_command == 'updatePlayer' )
		{
			foreach ( $Server->wsClients as $id => $client )
			{
				if ( $id != $clientID )
				{
					$Server->wsSend($id, "~:updatePlayer:$m_value");
				}
			}
		}
	}
	else
	{
		//The speaker is the only person in the room. Don't let them feel lonely.
		if ( sizeof($Server->wsClients) == 1 )
		{
			$Server->wsSend($clientID, "There isn't anyone else in the room, but I'll still listen to you. --Your Trusty Server");
		}
		else
		{
			//Send the message to everyone but the person who said it
			foreach ( $Server->wsClients as $id => $client )
			{
				if ( $id != $clientID )
				{
					$Server->wsSend($id, "Visitor $clientID ($ip) said \"$message\"");
				}
			}
		}
	}
}

// when a client connects
function wsOnOpen($clientID)
{
	global $Server;
	global $players;
	
	$ip = long2ip( $Server->wsClients[$clientID][6] );

	$Server->log( "$ip ($clientID) has connected." );

	//Send a join notice to everyone but the person who joined
	foreach ( $Server->wsClients as $id => $client )
	{
		if ( $id != $clientID )
		{			
			// $Server->wsSend($id, "Visitor $clientID ($ip) has joined the chat room.");			
		}
	}
}

// when a client closes or lost connection
function wsOnClose($clientID, $status) {
	
	global $Server;
	global $players;
	
	$ip = long2ip( $Server->wsClients[$clientID][6] );

	$Server->log( "$ip ($clientID) has disconnected." );

	//Send a user left notice to everyone in the room
	$closingPlayerId = $players[ $clientID ];
	foreach ( $Server->wsClients as $id => $client )
	{
		$Server->wsSend($id, "~:removePlayer:$closingPlayerId");
	}
	unset( $players[ $clientID ] );
	// foreach ( $Server->wsClients as $id => $client )
	// 	$Server->wsSend($id, "Visitor $clientID ($ip) has left the room.");
}

// start the server
$Server = new PHPWebSocket();
$Server->bind('message', 'wsOnMessage');
$Server->bind('open', 'wsOnOpen');
$Server->bind('close', 'wsOnClose');
// for other computers to connect, you will probably need to change this to your LAN IP or external IP,
// alternatively use: gethostbyaddr(gethostbyname($_SERVER['SERVER_NAME']))
$Server->wsStartServer('127.0.0.1', 9300);

?>