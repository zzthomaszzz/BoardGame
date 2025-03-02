const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.use(express.static(__dirname+'/public'));

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

//List of all players
var SOCKET = {};

class Player{
  constructor(id){
    this.id = this.id;
    this.hero = new defaultHero();
  }
}

class defaultHero{
  constructor(){
    this.health = 100;
    this.attack = 5;
    this.armor = 5;
    this.speed = 2;
  }
}

io.on('connection', (socket) => {
    socket.id = Math.random();
    console.log(socket.id);
    SOCKET[socket.id] = new Player(socket.id);

});

io.on('disconnect', (socket) => {
  delete SOCKET[socket.id];
  console.log('deleted player id: ' + socket.id);
})