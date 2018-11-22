class GrassEater extends LivingCreature{
    constructor(x, y) {
        super(x, y);
        this.col="yellow";
        this.index = 2;
        this.energy = 3;
        this.inFight = false;
    }

    chooseCell(index_number) {
        super.getNewCoords();
        return super.chooseCell(index_number)
    }

    move() {
        super.getNewCoords();
        var newCell = random(this.chooseCell(0));
        
        if (newCell) {
           // turn this coord to ground (index=0), and new coords to grassEater(index =2) 
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 2;
            this.x = newCell[0];
            this.y = newCell[1];
            this.energy--;
            console.log("GrassEater's energy is    " + this.energy)
        }
        
    }

    breed() {
        if (this.energy >=3){
            //make new grasseater object in random chooseplace 
            var newCell = random(this.chooseCell(0));
            if (newCell) {
                var newGrasster = new GrassEater(newCell[0], newCell[1]);
                grassEaterArr.push(newGrasster);
                matrix[newCell[1]][newCell[0]] = 2;
                this.energy -=2;
                console.log("GrassEater's energy is    " + this.energy);
            }
        }
    }

    eat() {
        if (this.energy < 10) {
            super.getNewCoords();

            var newGrass = random(this.chooseCell(1));
            var newFlower = random(this.chooseCell(4));

            // if eats flower turns into animal with the same energy 
            if (newFlower) {
                matrix[this.y][this.x] = 0;
                matrix[newFlower[1]][newFlower[0]] = 5; // animal index 
                
                // create enemy object and append it to the enemyArr
                var en = new Enemy(newFlower[0], newFlower[1], this.energy);
                enemyArr.push(en);
                
                // Find the flower from arr and delete it 
                for (var i in flowerArr) {
                    if (this.x == flowerArr[i].x && flowerArr[i].y == this.y) {
                        flowersArr.splice(i, 1);
                    }
                }
            }
            else if (newGrass) {
                matrix[this.y][this.x] = 0;
                matrix[newGrass[1]][newGrass[0]] = 2;
                this.x = newGrass[0];
                this.y = newGrass[1];

                // Find the grass from arr and delete it 
                for (var i in grassArr) {
                    if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                        grassArr.splice(i, 1); // array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
                        this.energy++;
                    }
                }

            }
        }
    }

    fight(enemy) {
        //this.getNewCoords();
        //var findEnemy = this.chooseCell(5);
        //if (findEnemy) {
        while (true) {
            this.energy--;
            enemy.energy--;

            if (this.energy <= 0) {
                //this.die();
                this.energy = -1;
                break;
            }
            else if (enemy.energy <= 0) {
                enemy.die();
                return true;
            }
            console.log("GrassEater's energy is   " + this.energy, "Enemy's energy is   " + enemy.energy);
        }
    }

    die() {

        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            // Find the grasseater from arr and delete it 
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                }
            }
            //  console.log("GrassEater is dead");
        }

    }

}