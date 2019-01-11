var express = require('express');
var app = express();
var http = require('http');
var mysql = require('mysql');
var filesys = require('fs');
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;

var server = http.createServer(app);
server.listen(port);
console.log("Server running on port ", port);

var curr_photo_id = 0;
var next_vote_id = 0; //equal to number of voters
var session_id = Math.floor((Math.random() * 100000) + 1);
var photofilenames = filesys.readdirSync('./Public/photos');

//socket
io.on('connection',function(socket){
    socket.on('AdminIni', function(socketid){
        socket.emit('AdminIniResponse', curr_photo_id,next_vote_id);
    });

    socket.on('ProjectIni', function(){
        console.log("New projection added.");
        //Add new projection page into projections socket room
        socket.join('projections');
        
        //update projection page to current photo id
        dbcon.connect(function(err){
            if(err) throw err;
            var sql = "SELECT photo_filename FROM photos WHERE photo_id = "+curr_photo_id+" ";
            dbcon.query(sql,function(err,result){
                if(err) throw err;
                socket.to("projections").emit('Update',result,curr_photo_id);
            });
        });
        

    });

    socket.on('VoteIni', function(){
        console.log("Sending vote_id =", next_vote_id);
        socket.emit('SendVoteID',next_vote_id);
        next_vote_id += 1;
    });

    //admin.js update projections
    socket.on('ChangePhotoID', function(photo_id){
        //console.log("Photo id = ", photo_id);
        
        //sync admin photo_id and curr_photo_id
        curr_photo_id = photo_id;
        
        //Use photo_id to query for photo from mysql then send new_photo to projections?
        
        //update projection screens
        dbcon.connect(function(err){
            if(err) throw err;
            var sql = "SELECT photo_filename FROM photos WHERE photo_id = "+curr_photo_id+" ";
            dbcon.query(sql,function(err,result){
                if(err) throw err;
                socket.to("projections").emit('Update',result,curr_photo_id);
            });
        });

    });

    socket.on('QueryPhoto', function(photo_id){
        //Use photo_id to query for photo from mysql then send back photo
        var new_photo = "new photo";
        
        dbcon.connect(function(err){
            if(err) throw err;
            var sql = "SELECT photo_filename FROM photos WHERE photo_id = "+photo_id+" ";
            dbcon.query(sql,function(err,result){
                if(err) throw err;
                socket.emit('NewPhoto',result)
            });
        });

    });

});

//mysql
var con = mysql.createConnection({
    host: 'localhost',
    user: 'anthony',
    password: 'compass',
    insecureAuth : true,
    port: 3306
});

con.connect(function(err){
    if(err) throw err;
    console.log("MySQL connected!");
    var sql = "CREATE DATABASE IF NOT EXISTS voteDB";
    con.query(sql, function (err,result){
        if (err) throw err;
        console.log("VoteDB created.");
    });

});

var dbcon = mysql.createConnection({
    host: 'localhost',
    user: 'anthony',
    password: 'compass',
    database: 'voteDB',
    insecureAuth : true,
    port: 3306
});

dbcon.connect(function(err){
    if(err) throw err;
    console.log("voteDB connect");
    //photos table
    var sql = "CREATE TABLE photos (photo_id INT AUTO_INCREMENT PRIMARY KEY, photo_filename VARCHAR(255))";
    dbcon.query(sql, function(err,result){
        if (err) throw err;
        console.log("photos table created.")

    });

    //votes table
    var sql = "CREATE TABLE votes (user_id INT PRIMARY KEY, photo_id INT FOREIGN KEY, cat1_score INT, cat2_score INT, cat3_score INT)";
    dbcon.query(sql, function(err,result){
        if (err) throw err;
        console.log("photos table created.")
        
    });

    //add photos file names to db
    photofilenames.forEach(function(element){
        var sql = "INSERT INTO photos (photo_filename) VALUES ('"+element+"')";
        dbcon.query(sql, function(err,result){
            if (err) throw err;
            console.log("Added "+element+" to photos table.")
        });
    });

});

//express
var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm','html'],
    index: "Login/Login.html"
}

//parse
app.use(express.json());
app.use(express.urlencoded( { extended:false} ));

app.use(express.static(__dirname +"/Public",options));

app.post('/Login',function(req,res){
    console.log(req.method,' request: ', req.url);
    var User = req.body.Username;
    var Pass = req.body.Password;
    console.log('Username = ', User,'PassAttempt = ', Pass);

    if(User == "voter"){ 
        //go to vote page
        res.sendFile(__dirname + "/Public/Vote/Vote.html");
    }
    if(User == "admin"){//Change admin to something else OR require password for admin
        //go to admin page
        res.sendFile(__dirname + "/Admin/AdminPage.html");
    }
    if(User == "projection"){
        //go to projection page
        res.sendFile(__dirname + "/Admin/ProjectionPage.html");
    }
});

app.post('/Vote',function(req,res){
    console.log(req.method," request: ", req.url);
    console.log("body = ",req.body);

    var Vote = req.body.Vote;

    console.log("Vote = ", req.body.VoteID);
    
    //Add vote to database
    dbcon.connect(function(err){
        if(err) throw err;
        console.log("voteDB connect");
        //photos table
        
        var sql = "INSERT INTO votes (user_id,photo_id,cat1_score,cat2_score,cat3_score) VALUES ('" + req.body.VoteID + "','"+ req.body.PhotoID + "','" + req.body.Cat1+ "','" + req.body.Cat2+ "','" + req.body.Cat3+ "')";
        dbcon.query(sql, function(err,result){
            if (err) throw err;
            console.log("vote inserted into DB")

        });
    });

    res.end();
});