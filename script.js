const socket = io();
const side = 30;
function setup() {
  createCanvas(20 * side, 20 * side);
  background("pink");
}

function drawMatrix(matrix) {
  console.log(matrix);
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === 1) {
        fill("green");
      } else if (matrix[y][x] === 2) {
        fill("yellow");
      } else if (matrix[y][x] === 3) {
        fill("red");
      } else if (matrix[y][x] === 4) {
        fill("purple");
      } else if (matrix[y][x] === 5) {
        fill("blue");
      } else {
        fill("while");
      }
      rect(x * side, y * side, side, side);
    }
  }
}

// setInterval(function (data) {
  socket.on("send matrix", drawMatrix);
// }, 1000);

// function updateObjectsMatrix(matrix) {
//     for (let y = 0; y < matrix.length; y++) {
//         for (let x = 0; x < matrix[y].length; x++) {
//             const object = matrix[y][x];
//             if (object) {
//                 object.update();
//             }
//         }

//     }
// }
