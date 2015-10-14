var https = require('https');
var storedToken = '';
function stream(roomId, token, callback) {
    token = token || storedToken;
    var heartbeat = ' \n';
    var hostname = roomId
        ? 'stream.gitter.im'
        : 'api.gitter.im';
    var gitterPath = roomId
        ? "/v1/rooms/" + roomId + "/chatMessages"
        : "/v1/rooms";
    var options = {
        hostname: hostname,
        port: 443,
        path: gitterPath,
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    };
    if (!callback)
        callback = function (data) { return console.log(data); };
    var req = https.request(options, function (res) {
        res.on('data', function (chunk) {
            var msg = chunk.toString();
            if (msg !== heartbeat)
                callback(msg);
        });
    });
    req.on('error', function (e) {
        console.log('Something went wrong: ' + e.message);
    });
    req.end();
}
module.exports = stream;
