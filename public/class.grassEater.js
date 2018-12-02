// the yellow one(3), moves, breeds my separating  and dies as others, eat flower and turns into enemy, eat grass and add energy, 
class GrassEater extends LivingCreature{
    constructor(x, y, sex) {
        super(x, y);
        this.col="yellow";
        this.index = 2;
        this.energy = 5;
        this.inFight = false;
        this.sex = sex;
        this.canBreed = 0;

    }

    chooseCell(index_number) {
        super.getNewCoords();
        return super.chooseCell(index_number)
    }

    move(season) {
        super.getNewCoords();
        var newCell = random(this.chooseCell(0));
        //console.log("Season is " + season )
        if (newCell) {
           // turn this coord to ground (index=0), and new coords to grassEater(index =2) 
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 2;
            this.x = newCell[0];
            this.y = newCell[1];
            if(season != "winter")
                this.energy--;
            //console.log("GrassEater's energy is    " + this.energy)
        }
        
    }

    breed(season) {
        this.canBreed++;
        if (this.energy > 1 /*&& this.sex == 0*/) {
            //console.log(this.sex)
            var newGrassEater = this.chooseCell(2);
            var newCell = random(this.chooseCell(0))
            /* newGrassEater.sex == 1, can't put this condition cause newGrassEater isn't an object */
            if (newGrassEater && newCell && this.canBreed >= 3) {
                var newGrassEater = new GrassEater(newCell[0], newCell[1], Math.round(Math.random()));
                grassEaterArr.push(newGrassEater);
                matrix[newCell[1]][newCell[0]] = 2;
                // in spring grassEater doesn't loose energy and canBreed  increases 
                if(season != "spring")
                {
                    this.energy--;
                    this.canBreed = 0;
                }
                //console.log("breeding")
            }
        }
    }

    eat(season) {
        // can't eat in winter 
        if (this.energy < 12 && season != "winter") {
            super.getNewCoords();

            var newGrass = random(this.chooseCell(1));
            var newFlower = random(this.chooseCell(4));

            // if eats flower turns into animal with the same energy 
            if (newFlower) {
                matrix[this.y][this.x] = 0;
                matrix[newFlower[1]][newFlower[0]] = 5; // animal index 
                
                // create enemy object and append it to the enemyArr
                var en = new Enemy(newFlower[0], newFlower[1],this.energy, Math.round(Math.random()));
                enemyArr.push(en);
                
                // Find the flower from arr and delete it 
                for (var i in flowerArr) {
                    //console.log(flowerArr)
                    if (this.x == flowerArr[i].x && this.y == flowerArr[i].y) {
                        flowerArr.splice(i, 1);
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
                        this.energy+=2;
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
            //console.log("GrassEater's energy is   " + this.energy, "Enemy's energy is   " + enemy.energy);
        }
    }

    die() {

        if (this.energy < 0) {
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
    mutation()
    {
        matrix[this.y][this.x] = 1;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                var gr = new Grass(this.x, this.y);
                grassArr.push(gr);
            }
        }
    }

}