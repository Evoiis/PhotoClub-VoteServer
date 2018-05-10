function sendVote(){
    var score = $('#voteNum').val();
    $.ajax({
        method: 'post',
        url: '/Vote',
        data: 'Vote= ' + score,
        success: VoteSent(score)
    });
}

function VoteSent(score){
    $('#text').html("Score submitted successfully! You entered: " + score);
}