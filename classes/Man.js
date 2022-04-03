let LivingCreature = require("./LivingCreature")

module.exports = class Man extends LivingCreature{

    constructor(x, y, id, matrix, objectsMatrix) {
        super(x,y,id,matrix)
        this.objectsMatrix = objectsMatrix;
        this.energy = 18;
        this.updateCoordimates();

    }


    updateCoordimates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }

    chooseCells(characterId) {
        this.updateCoordimates();
        return super.chooseCells(characterId)
    }

    multiply() {


        let targetCells = this.chooseCells(0);
        let newCell =targetCells[Math.floor(Math.random()*targetCells.length)];


        if (this.energy >= 12 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[newY][newX] = this.id;

            let newMan = new Man(newX, newY, this.id, this.matrix, this.objectsMatrix);
            this.objectsMatrix[newY][newX] = newMan;

            this.energy = 8;
        }
    }

    move() {
        let targetCells = this.chooseCells(0);
        let newCell =targetCells[Math.floor(Math.random()*targetCells.length)];


        if (this.energy > 0 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[newY][newX] = this.id;
            this.matrix[this.y][this.x] = 0;

            this.objectsMatrix[newY][newX] = this;
            this.objectsMatrix[this.y][this.x] = null;


            this.x = newX;
            this.y = newY;

            this.energy--;

        }


        this.die();

    }

    eat() {
        let targetCells = this.chooseCells(3);
        let newCell =targetCells[Math.floor(Math.random()*targetCells.length)];


        if (this.energy > 0 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[newY][newX] = this.id;
            this.matrix[this.y][this.x] = 0;

            this.objectsMatrix[newY][newX] = this;
            this.objectsMatrix[this.y][this.x] = null;


            this.x = newX;
            this.y = newY;

            this.energy++;
            this.multiply();
        } else {
            this.move();
        }




    }


    die() {
        if (this.energy <= 0) {
            this.matrix[this.y][this.x] = 0;
            this.objectsMatrix[this.y][this.x] = null;
        }
    }

    update() {
        this.eat();

    }



}
