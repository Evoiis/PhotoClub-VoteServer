var socket = io.connect('http://localhost:8080');
var photo_id = 0;

socket.on('connect', function(){
    socketid = socket.id;

    //ask for current image,# of votes,etc...
    socket.emit('AdminIni', socketid);
    
});

socket.on('AdminIniResponse',function(server_photo_id){
    photo_id = server_photo_id;
});

function update_projection(forward){
    if(forward){
        photo_id += 1;
    }else{
        if(photo_id != 0){
            photo_id -= 1;
        }
    }
    socket.emit('ChangePhotoID',photo_id);
}