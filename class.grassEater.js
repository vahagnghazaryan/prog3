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
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 2;
            this.x = newCell[0];
            this.y = newCell[1];
            this.energy--;
            // console.log("GrassEater's energy is    " + this.energy)
        }
        
    }

    breed() {
        if (this.energy >=2){
            var newCell = random(this.chooseCell(0));
            if (newCell) {
                var newGrasster = new GrassEater(newCell[0], newCell[1]);
                grassEaterArr.push(newGrasster);
                matrix[newCell[1]][newCell[0]] = 2;
                this.energy -=2;
                //  console.log("GrassEater's energy is    " + this.energy);
            }
        }
    }

    eat() {
        if (this.energy < 10) {
            super.getNewCoords();
            var newGrass = random(this.chooseCell(1));
            var newFlower = random(this.chooseCell(4));
            if (newFlower) {
                matrix[this.y][this.x] = 0;
                matrix[newFlower[1]][newFlower[0]] = 5;

                var en = new Enemy(newFlower[0], newFlower[1], this.energy);
                enemyArr.push(en);
                for (var i in grassArr) {
                    if (this.x == grassArr[i].x && grassArr[i].y == this.y) {
                        grassArr.splice(i, 1);
                    }
                }
            }
            else if (newGrass) {
                matrix[this.y][this.x] = 0;
                matrix[newGrass[1]][newGrass[0]] = 2;
                this.x = newGrass[0];
                this.y = newGrass[1];
                for (var i in grassArr) {
                    if (this.x == grassArr[i].x && grassArr[i].y == this.y) {
                        grassArr.splice(i, 1);
                        this.energy++;
                    }
                }

            }
        }
    }

    fight(black) {
        //this.getNewCoords();
        //var findEnemy = this.chooseCell(5);
        //if (findEnemy) {
        while (true) {
            this.energy--;
            black.energy--;

            if (this.energy <= 0) {
                //this.die();
                this.energy = -1;
                break;
            }
            else if (black.energy <= 0) {
                black.die();
                return true;
            }
            console.log("GrassEater's energy is   " + this.energy, "Enemy's energy is   " + black.energy);
        }

        //}
    }

    die() {

        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1);
                }
            }
            //  console.log("GrassEater is dead");
        }

    }

}