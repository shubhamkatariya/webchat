var app = require('express')();
var express = require('express');
var con = require('./db/connection')
var bodyParser = require('body-parser')
var fs = require('fs');
var http = app.listen(3000, function(){
  console.log('listening on *:3000');
});
var io = require('socket.io')(http);
var path = require("path");

app.use(bodyParser.urlencoded());
app.use(express.static("../client1"));

app.get('/', function(req, res){
  res.sendFile(path.resolve("../client1/index.html"));
});

io.on('connection', function(socket){

  socket.on('join', function (data) {
      var insert_query = "INSERT INTO user set ?";
      var user_data = {"email": data.email, "name": data.name, "phone": data.phone}
      con.query(insert_query, user_data, function (err, result) {
      if (err) throw err;
      console.log("User registered successfully");
      socket.join(data.email);
      io.sockets.in(data.email).emit('join_response', {welcome_msg: "Welcome "+data.email});
      });
    });

 socket.on('chat_msg', function(data){
   io.sockets.in(data.email).emit('chat_msg_response', {msg: data.msg, reply: "Hi"});
 });


  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
