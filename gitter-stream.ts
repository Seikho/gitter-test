import https = require('https');
export = stream;

var storedToken = '';
function stream(roomId?: string, token?: string, callback?: GitterCallback) {
    token = token || storedToken;
    var heartbeat = ' \n';
    
    var hostname = roomId
        ? 'stream.gitter.im'
        : 'api.gitter.im'
    
    var gitterPath = roomId 
        ? `/v1/rooms/${roomId}/chatMessages`
        : `/v1/rooms`;

    var options = {
        hostname,
        port: 443,
        path: gitterPath,
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    };
    
    if (!callback) callback = (data) => console.log(data);
    
    var req = https.request(options, res => {
        res.on('data', function(chunk) {
            var msg = chunk.toString();
            if (msg !== heartbeat) callback(msg);
        });
    });

    req.on('error', function(e) {
        console.log('Something went wrong: ' + e.message);
    });

    req.end();
}

interface GitterCallback {
    (data: string): void;
}