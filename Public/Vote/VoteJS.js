var socket = io.connect('http://localhost:8080');
var vote_id;
var photo_id = 0;

socket.on('connect', function(){
    //onconnect ask for voting ID
    vote_id = localStorage.getItem('VotingID');
    if(vote_id != null){
        socket.emit('VoteIni');
    }
});

socket.on('connect_error', function(err){
    console.log("Error: ",err);
});

socket.on('NewPhoto', function(new_photo){
    //console.log("Data = ", data);
    var newSrc = "./Photos/" + new_photo;
    $('img').attr('src',newSrc);
});

socket.on('SendVoteID', function(number){
    vote_id = number;
    console.log("Num = ",vote_id);
    localStorage.setItem('VotingID',number);
});

function SendVote(){
    //rename cats to actual category names
    var scores = [ $('#cat1').val(), $('#cat2').val(),$('#cat3').val()];
    $.ajax({
        method: 'post',
        url: '/Vote',
        data: 'VoteID= ' + vote_id + '&PhotoID= ' + photo_id + '&Cat1= ' + scores[0] + '&Cat2=' + scores[1] + '&Cat3=' + scores[2],
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