// the blue one, spreads if has energy  
class Water extends LivingCreature{
    constructor(x, y) {
        super(x, y)
    this.col="blue";
    this.index = 6;
    this.energy = 4;
    }
    spread() {
        if(this.energy >1)
        {
            var newCell = random(this.chooseCell(0)); // [  [0,1], [2,4], [5,5] ]
            if (newCell) {
                var newWater = new Water(newCell[0], newCell[1]);
                waterArr.push(newWater);
                matrix[newCell[1]][newCell[0]] = 6;
                this.energy --;
                console.log("Water's energy is    " + this.energy)
            }
        }
        
    }
    freeze()
    {
        this.energy = 0;
        this.col = "#E1E7E4";
        console.log("Water is freezing     " + this.energy)
    }

}


