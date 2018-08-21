var Username = '';
var flag = 0;
function Login(){
    Username = $('#Username').val();
    /*
    if(Username == "admin"){
        if(flag == 0){
            var pwHTML = '<br>Password:<br><input type="password" id="Password" name="Password" placeholder="Password"/><br>';
            $('#pwContainer').html(pwHTML);
            flag  = 1;
        }else{
            $.ajax({
                method: 'post',
                url: '/Login',
                data: 'Username=' + Username + '&Password=' + $('#Password').val()
                //success: 
            });
        }
    }else{
    */
        $.ajax({
            method: 'post',
            url: '/Login',
            data: 'Username=' + Username,
            success: UpdatePage 
        });
    }
//}

function UpdatePage(data){
    //console.log("File = ", data);
    //console.log(window.document);
    //window.location.href = "/Vote/Vote.html";
    window.document.write(data);
}

//-----socket
/*
var socket = io.connect('http://localhost:8080');
var socketid;

socket.on('connect', function(){
    socketid = socket.id;
});
*/