function sendVote(){
    var cat1score = $('#cat1').val();
    var cat2score = $('#cat2').val();
    var cat3score = $('#cat3').val();

    $.ajax({
        method: 'post',
        url: '/Vote',
        data: 'Cat1= ' + cat1score + '&Cat2=' + cat2score + '&Cat3=' + cat3score,
        success: VoteSent(cat1score)
    });
}

function VoteSent(score){
    $('#text').html("Score submitted successfully! You entered: " + score);
}