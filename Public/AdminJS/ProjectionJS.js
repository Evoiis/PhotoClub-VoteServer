var socket = io.connect('http://localhost:8080');

socket.on('connect', function(){
    socket.emit('ProjectIni');
    
    //socket.on('', picture);
});

socket.on('Update', function(new_photo){
    //console.log("Server sent: ", new_photo);
    //$('#IDforIMAGEobject OR useIMGtag').attr('src','new_photo');
    
});