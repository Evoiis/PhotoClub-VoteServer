var Username = '';
function Login(){
    Username = $('#Username').val();
    $.ajax({
        method: 'post',
        url: '/Login',
        data: 'Username=' + Username + '&Password=' + $('#Password').val()
        //success: 
    });
}

//-----socket
/*
var socket = io.connect('http://localhost:8080');
var socketid;

socket.on('connect', function(){
    socketid = socket.id;
});
*/