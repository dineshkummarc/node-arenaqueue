
/**
 * Module dependencies.
 */


 var http = require('http');
 var url = require('url');
 var fs = require('fs');
 var sys = require('sys');
 var express = require('express');
 var connect = require('connect');
 var io = require('socket.io');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.use(connect.bodyDecoder());
    app.use(connect.methodOverride());
    app.use(connect.compiler({ src: __dirname + '/public', enable: ['less'] }));
    app.use(app.router);
    app.use(connect.staticProvider(__dirname + '/public'));
});

// Routes

app.get('/', function(req, res){
    res.render('index.ejs', {
        locals: {
            title: 'Express'
        }
    });
});

// Only listen on $ node app.js

if (!module.parent) app.listen(3000);


/* Chat Socket Server */ 
server = http.createServer(function(req, res){});
server.listen(3001);
io = io.listen(server);

var players = [];


io.on('connection', function(client) { 
  console.log("Player has connected to arena server.");
  players.push(client);
});

io.on('disconnect', function(client) {
  var i = players.indexOf(client);
  players.splice(i, 1);
  
});


  var gameFinder = setInterval(function() {
    if (players.length > 1) {

      

      console.log("MATCHING PLAYERS NOW...");
      var rejectedList = []; //store clients that you don't want to publish messages to
                            //so that they don't all enter into a game instnace at once.
                            //only the players that were chosen!

      //this is where you would implement more robust match making algorithm (delegate this)
      //var player1index = Math.random(0, players.length - 1);
      //var player2index = Math.random(0, players.length - 1);

      //TODO: add to the rejectedList so that we can filter out who gets the broadcast or not
      //code goes here

      //TODO: broadcast to the specific clients that were chosen
      //io.broadcast([players[player1index], players[player2index]], rejectedList);

      console.log("-----------");
      players.forEach(function(client) {
        console.log("id: " + client.sessionId);
      });

      //TODO: disconnect the two chosen players from the queue system
      //code goes here
      
      
      
      
      clearTimeout(gameFinder); //kill lopo
    } else {
      console.log("Waiting for more players...");
    }
    
  }, 1500);

