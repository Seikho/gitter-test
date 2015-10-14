var gitter = require('./gitter-stream');
var cb = function (data) {
    var isRoom = function (roomName) { return function (room) {
        console.log(roomName, '===', room.name);
        if (room.name === roomName) {
            gitter(room.id, console.log);
        }
    }; };
    var rooms = JSON.parse(data);
    rooms.forEach(isRoom('ramda/ramda'));
};
gitter(null, cb);
