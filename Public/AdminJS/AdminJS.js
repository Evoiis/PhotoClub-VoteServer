socket.on('connect', function(){
    socketid = socket.id;

    //socket.emit('projectini', socketid);
    

    //socket.on('', picture);

});

//socket.emit('');

function update_projection(forward){
    var photo_id = null;
    socket.emit('UpdateProjections',photo_id);
}