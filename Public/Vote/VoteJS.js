function sendVote(){
    var cat1score = $('#cat1').val();
    var cat2score = $('#cat2').val();
    var cat3score = $('#cat3').val();
    //get rid of ^^, replace with:
    var scores = [cat1score,cat2score,cat3score];
    $.ajax({
        method: 'post',
        url: '/Vote',
        data: 'Cat1= ' + cat1score + '&Cat2=' + cat2score + '&Cat3=' + cat3score,
        success: VoteSent(scores)
    });
}

function VoteSent(scores){
    $('#text').html("Scores submitted successfully! You entered: " + scores);
}

//Ask server for photo with photo_id
function QueryPhotoID(photo_id){
    socket.emit('QueryPhoto',photo_id);
}

var socket = io.connect('http://localhost:8080');
var socketid;

socket.on('connect', function(){

});

socket.on('NewPhoto', function(data){
    console.log("Thing is: ", data);
    //$('#IDforIMAGEobject OR useIMGtag').attr('src','new_photo');
});