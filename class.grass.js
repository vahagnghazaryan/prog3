 class Grass extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.col = "green";
        this.index = 1;
    }

    breed() {
        //[0,1]
        var newCell = random(this.chooseCell(0)); // [  [0,1], [2,4], [5,5] ]
        if (newCell) {
            var newGrass = new Grass(newCell[0], newCell[1]);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
        }
    }

}
