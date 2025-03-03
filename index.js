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


// Screen is 800x600, you will need the map to be 16 blocks wide and 12 blocks high
class Map {
  constructor(){
    this.mapIndex = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    this.createMap();
  }

  createMap(){
    var y = 0;
    while(y < this.mapIndex.length, y++){
      var x = 0;
      while(x < this.mapIndex[y].length, x++){
        switch(this.mapIndex[y][x]){
          case 0:
            Map.data[y][x] = new Tile(x, y, 0);
            break;
          case 1:
            Map.data[y][x] = new Tile(x, y, 1);
            break;
          default:
            Map.data[y][x] = new Tile(x, y, 0);
            break;
        }
      }
    }
  }
}

Map.data = [];
new Map();
console.log(Map.data);

class Tile{
  constructor(x, y, id){
    this.x = x;
    this.y = y;
    this.id = id;
    this.occupied = false;
  }
}

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
    socket.emit("mapPack", {map: Map.data});
});