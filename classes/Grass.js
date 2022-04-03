let LivingCreature = require("./LivingCreature")

module.exports = class Grass extends LivingCreature{

    constructor(x, y, id, matrix) {
        super(x,y,id,matrix)
        // this.objectsMatrix = objectsMatrix;
        this.energy = 0;


    }

    multiply() {
        this.energy++;

        let targetCells = super.chooseCells(0);
        let newCell =targetCells[Math.floor(Math.random()*targetCells.length)];


        if (this.energy >= 8 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            this.matrix[newY][newX] = this.id;

            // let newGrass = new Grass(newX, newY, this.id, this.matrix, this.objectsMatrix);
            // this.objectsMatrix[newY][newX] = newGrass;
            Grassarr.push(new Grass(newX, newY, this.id, this.matrix))

            this.energy = 0;
        }
    }
    // update() {
    //     this.multiply();
    // }
}
