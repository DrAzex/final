var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var fs = require("fs");

app.use(express.static("."));

app.get("/", function (req, res) {
  res.redirect("index.html");
});
server.listen(3004, () => {
  console.log("connected");
});

Grass = require("./classes/Grass");
GrassEater = require("./classes/GrassEater");
Man = require("./classes/Man");
Dino = require("./classes/Dino");
Predator = require("./classes/Predator");

matrix = [];

Grassarr = [];
GrassEaterarr = [];
Manarr = [];
Dinoarr = [];
Predatorarr = [];

function createMatrix(horizontaLength, verticalLength) {
  let matrix = [];
  for (let y = 0; y < verticalLength; y++) {
    matrix[y] = [];
    for (let x = 0; x < horizontaLength; x++) {
      const randonSectionCursor = Math.floor(Math.random() * 100);

      if (randonSectionCursor < 20) {
        matrix[y][x] = 1;
      } else if (randonSectionCursor < 30) {
        matrix[y][x] = 2;
      } else if (randonSectionCursor < 40) {
        matrix[y][x] = 3;
      } else if (randonSectionCursor < 50) {
        matrix[y][x] = 4;
      } else if (randonSectionCursor < 60) {
        matrix[y][x] = 5;
      } else {
        matrix[y][x] = 0;
      }
    }
  }
  return matrix;
}

matrix = createMatrix(20, 20)

io.sockets.emit("send matrix", matrix);

/* */
// var n = 50;

// function rand(min, max) {
//   return Math.random() * (max - min) + min;
// }

// for (let i = 0; i < n; i++) {
//   matrix[i] = [];
//   for (let j = 0; j < n; j++) {
//     matrix[i][j] = Math.floor(rand(0, 5));
//   }
// }

// io.sockets.emit("send matrix", matrix);

function createObjectsMatrix() {
  for (let y = 0; y < matrix.length; y++) {
    // matrix[y] = [];
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === 1) {
        const newGrass = new Grass(x, y, 1, matrix);
        Grassarr.push(newGrass);
        matrix[y][x] = newGrass;
      } else if (matrix[y][x] === 2) {
        const newGrassEater = new GrassEater(x, y, 2, matrix, matrix);
        GrassEaterarr.push(newGrassEater);
        matrix[y][x] = newGrassEater;
      } else if (matrix[y][x] === 3) {
        const newPredator = new Predator(x, y, 3, matrix, matrix);
        Predatorarr.push(newPredator);
        matrix[y][x] = newPredator;
      } else if (matrix[y][x] === 4) {
        const newMan = new Man(x, y, 4, matrix, matrix);
        Manarr.push(newMan);
        matrix[y][x] = newMan;
      } else if (matrix[y][x] === 5) {
        const newDino = new Dino(x, y, 5, matrix, matrix);
        Dinoarr.push(newDino);
        matrix[y][x] = newDino;
      } else {
        matrix[y][x] = null;
      }
    }
  }
  // return newObjectsMatrix;
  io.sockets.emit("send matrix", matrix);
}
function game() {
  for (var i in Grassarr) {
    Grassarr[i].multiply();
  }
  for (var i in GrassEaterarr) {
    GrassEaterarr[i].eat();
  }
  for (var i in Manarr) {
    Manarr[i].eat();
  }
  for (var i in Dinoarr) {
    Dinoarr[i].eat();
  }
  for (var i in Predatorarr) {
    Predatorarr[i].eat();
  }
  io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000);

io.on("connection", function (socket) {
  createObjectsMatrix();
});
