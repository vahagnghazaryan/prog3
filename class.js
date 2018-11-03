class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.col="green";
        this.index=1;
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
////////////////////////
    chooseCell(ch) {
        var found = [];
        for (var i in this.directions) {

            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
////////////////////////
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
///////////////////////////
///////////////////////////
class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.col="yellow";
        this.index = 2;
        this.energy = 3;
        this.inFight = false;
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
    /////////////
    obtainNewcoords() {
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
    /////////
    chooseCell(ch) {
        this.obtainNewcoords();
        var found = [];
        for (var i in this.directions) {

            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    ///////////////
    move() {
        this.obtainNewcoords();
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

    //////////////////
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
    //////////////
    eat() {
        if (this.energy < 10) {
            this.obtainNewcoords();
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
    ////////
    fight(black) {
        //this.obtainNewcoords();
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
    /////////
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
//////////////
class Animal {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.col="red";
        this.canBreed = 0;
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
        this.index = 3;
    }

    obtainNewcoords() {
        this.directions = [
            [this.x, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x, this.y + 1],
        ];
    }
    /////////
    chooseCell(ch) {
        this.obtainNewcoords();
        var found = [];
        for (var i in this.directions) {

            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        this.obtainNewcoords();
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 3;
            this.x = newCell[0];
            this.y = newCell[1];
        }

        this.energy--;
        // console.log("animal's energy is   " + this.energy);
    }
    //////////////
    eat() {
        if (this.energy <= 10) {
            this.obtainNewcoords();
            var newGrass = random(this.chooseCell(2));
            if (newGrass) {
                matrix[this.y][this.x] = 0;
                matrix[newGrass[1]][newGrass[0]] = 3;
                this.x = newGrass[0];
                this.y = newGrass[1];
                for (var i in grassEaterArr) {
                    if (this.x == grassEaterArr[i].x && grassEaterArr[i].y == this.y) {
                        grassEaterArr.splice(i, 1);
                        this.energy ++;
                    }
                }
                // var index = grassEaterArr.indexOf(newGrass);// GrassEater, [0,1]
                // grassEaterArr.splice(index, 1);
                //  console.log("animal's energy is   " + this.energy);
            }
        }
    }
    breed() {
        this.canBreed++;
        if (this.energy > 1) {
            var newAnimal = this.chooseCell(3);
            var newCell = random(this.chooseCell(0))
            if (newAnimal && newCell && this.canBreed >= 5) {
                var newAnimal = new Animal(newCell[0], newCell[1]);
                animalArr.push(newAnimal);
                matrix[newCell[1]][newCell[0]] = 3;
                this.energy --;
                this.canBreed = 0;
                //console.log("breed")
                //  console.log("GrassEater's energy is    " + this.energy);

            }
        }
    }
   ////////////////////
    die() {

        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;

            for (var i in animalArr) {
                if (this.x == animalArr[i].x && animalArr[i].y == this.y) {
                    animalArr.splice(i, 1);
                }
            }
            //   console.log("Animal is dead");
        }

    }

}
class Flower {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.col="white";
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
}



class Enemy {
    constructor(x, y, en) {
        this.x = x;
        this.y = y;
        this.col="black";
        this.energy = en;
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
        this.index = 5;
    }
    /////////////////
    obtainNewcoords() {
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
    /////////////////////
    chooseCell(ch) {
        this.obtainNewcoords();
        var found = [];
        for (var i in this.directions) {

            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    ///////////////////
    move() {
        // console.log(this.energy);
        this.obtainNewcoords();
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 5;
            this.x = newCell[0];
            this.y = newCell[1];
            this.energy--;
        }
    }
    ///////////////////////
    fight() {
        if (this.energy > 0) {
            this.obtainNewcoords();
            var findGrEater = random(this.chooseCell(2));
            //console.log(findGrEater, grassEaterArr);
            if (findGrEater) {
                for (var i in grassEaterArr) {
                    if (findGrEater[0] == grassEaterArr[i].x && findGrEater[1] == grassEaterArr[i].y) {
                        return grassEaterArr[i].fight(this);
                    }
                }
            }
        }


    }
///////////////////////
    breed() {
        if (this.energy >=2) {
            var newCell = random(this.chooseCell(0));
            if (newCell) {
                var newEnemy = new Enemy(newCell[0], newCell[1], 5);
                enemyArr.push(newEnemy);
                matrix[newCell[1]][newCell[0]] = 5;
                this.energy -=2;
                //  console.log("GrassEater's energy is    " + this.energy);

            }
        }
    }
//////////////////////
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in enemyArr) {
                if (this.x == enemyArr[i].x && enemyArr[i].y == this.y) {
                    enemyArr.splice(i, 1);
                }
            }
            console.log("ENEMY's is dead  ");
            //   console.log("Animal is dead");
        }
    }
}

