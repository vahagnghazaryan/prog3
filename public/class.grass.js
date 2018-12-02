 // the green one(1), breeds by separating(if has energy), freeze and dry by season, and die if energy is above zero  
 class Grass extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.col = "green";
        this.index = 1;
        this.energy = 2;
    }

    breed() {
        if(this.energy >2){
        //[0,1]
        var newCell = random(this.chooseCell(0)); // [  [0,1], [2,4], [5,5] ]
        if (newCell) {
            var newGrass = new Grass(newCell[0], newCell[1]);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
        }
    }
    }
    freeze(){
        //console.log(this.energy)
        this.energy +=0.5;
    }
    dry()
    {
        this.energy -=0.2;
    }
    die(){
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            // Find the grass from arr and delete it 
            for (var i in grassArr) {
                if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                }
            }
            //  console.log("GrassEater is dead");
        }
    }

}
