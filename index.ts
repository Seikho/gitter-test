import gitter = require('./gitter-stream');


var cb = (data: string) => {
    var isRoom = (roomName) => (room) => {
        console.log(roomName,'===',room.name);
        if (room.name === roomName) {
            gitter(room.id, console.log)
        }

    }

    var rooms = JSON.parse(data);
    rooms.forEach(isRoom('ramda/ramda'));
}

gitter(null, cb);

