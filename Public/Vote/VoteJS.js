var photo_id = 0;
var socket = io.connect('http://localhost:8080');

socket.on('connect', function(){
    //onconnect
    //? dunno if i need this
});

socket.on('NewPhoto', function(data){
    //console.log("Data = ", data);
    //$('#IDforIMAGEobject OR useIMGtag').attr('src','new_photo');
});

function SendVote(){
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
function QueryPhotoID(forward){
    if(forward){
        photo_id += 1;
    }else{
        if(photo_id != 0){
            photo_id -= 1;
        }
    }
    socket.emit('QueryPhoto',photo_id);
}

