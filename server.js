var express = require('express');
var app = express();
var http = require('http');
var mysql = require('mysql');
var port = process.env.PORT || 8080;

var server = http.createServer(app);
server.listen(port);
console.log("Server running on port ", port);

//socket
var io = require('socket.io')(server);

io.on('connection',function(socket){
    socket.on('name', function(param){
    
    });

    socket.on('projectini', function(socketid){
        socketid.join('projections');
    });
});
/*
//mysql
var con = mysql.createConnection({
    host: 'localhost',
    user: 'antho',
    password: 'compass',
    insecureAuth : true,
    port: 3306
});

con.connect(function(err){
    if(err) throw err;
    console.log("MySQL connected!");
});
*/
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

    if(User == "1"){ //Replace with <Random Gen Code>
        //go to vote page
        res.sendFile(__dirname + "/Public/Vote/Vote.html");
    }
    if(User == "admin"){
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

    console.log("Vote = ", Vote);
    //add vote to database...
    res.end();
});