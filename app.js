
/*
  if (players.length > 1) {
    players.forEach(function(client) {
      console.log("id: " + client.sessionId);
    });

    io.broadcast("onGameStart");
    clearInterval(gameFinder); //kill lopo
  } else {
    console.log("Waiting for more players...");
  }*/
  
  
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


/* Arena Finder Server */ 
server = http.createServer(function(req, res){});
server.listen(3001);
io = io.listen(server);

var players = [];

io.on('connection', function(client) { 
  console.log("Player has connected to arena server with sessionId: " + client.sessionId);
  players.push(client);
});

var gameFinder = setInterval(function() {
  if(players.length > 1) {
    io.broadcast("onGameStart");
    clearInterval(gameFinder);
  } else {
    console.log("Waiting for more plaeyrs");
  }
}, 1500);








