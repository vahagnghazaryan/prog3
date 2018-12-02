// the white one, 
class Flower extends LivingCreature{
    constructor(x, y) {
        super(x, y)
    this.col="white";
    this.index = 4;
    this.energy = 3;
    }

    breed() {
        if(this.energy >1){
            //[0,1]
            var newCell = random(this.chooseCell(0)); // [  [0,1], [2,4], [5,5] ]
            if (newCell) {
                var newFlower = new Flower(newCell[0], newCell[1]);
                flowerArr.push(newFlower);
                matrix[newCell[1]][newCell[0]] = 4; 
                this.energy --;    
            }
        }
    }   
}
