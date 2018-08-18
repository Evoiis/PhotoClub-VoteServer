var socket = io.connect('http://localhost:8080');
var socketid;

socket.on('connect', function(){
    socketid = socket.id;

    socket.emit('projectini', socketid);
    

    //socket.on('', picture);

});