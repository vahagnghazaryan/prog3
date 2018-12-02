// the blue one, spreads if has energy  
class Water extends LivingCreature{
    constructor(x, y) {
        super(x, y)
    this.col="blue";
    this.index = 6;
    this.energy = 2;
    }
    spread() {
        if(this.energy >1)
        {
            var newCell = random(this.chooseCell(0)); // [  [0,1], [2,4], [5,5] ]
            if (newCell) {
                var newWater = new Water(newCell[0], newCell[1]);
                waterArr.push(newWater);
                matrix[newCell[1]][newCell[0]] = 6;
                //console.log(this.energy)
                this.energy --;
                //console.log(this.energy)
            }
        }
    }
    freeze(){
        //console.log(this.energy)
        this.energy +=0.2;
    }
    drain()
    {
        this.energy -=0.1
    }
    die(){
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            // Find the water from arr and delete it 
            for (var i in waterArr) {
                if (this.x == waterArr[i].x && this.y == waterArr[i].y) {
                    waterArr.splice(i, 1);
                }
            }
            //  console.log("GrassEater is dead");
        }
    }
    mutation()
        {
            matrix[this.y][this.x] = 0;
            for (var i in waterArr) {
                if (this.x == waterArr[i].x && this.y == waterArr[i].y) {
                    waterArr.splice(i, 1);
                }
            }
        }
    
   

}


