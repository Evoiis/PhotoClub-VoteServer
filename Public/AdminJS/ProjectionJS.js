var socket = io.connect('http://localhost:8080');

socket.on('connect', function(){
    socket.emit('ProjectIni');
    
    //socket.on('', picture);
});

socket.on('Update', function(new_photo,photo_id){
    //console.log("Server sent: ", new_photo);
    $('#PhotoNumber').html(photo_id);
    var newSrc = "./Photos/" + new_photo;
    $('img').attr('src',newSrc);
});