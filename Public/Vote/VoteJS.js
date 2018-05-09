function sendVote(){

    $.ajax({
        method: 'post',
        url: '/Vote',
        data: 'Vote= ' +$('#voteNum').val(),
        success: VoteSent()
    });
}

function VoteSent(){
    $('#text').html("Vote submitted successfully!");
}