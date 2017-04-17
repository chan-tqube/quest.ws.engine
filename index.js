const WebSocket = require('ws');

const wss = new WebSocket.Server({
	perMessageDeflate: false,
	port: 80
});

wss.broadcast = function broadcast (data) {
	wss.clients.forEach(function each (client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(data);
		}
	});
};

wss.on('connection', function connection (ws) {
	ws.on('message', function incoming (data) {
		wss.clients.forEach(function each (client) {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(data);
			} 
		});
	})
});