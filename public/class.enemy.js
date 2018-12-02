// the black one, move, die and breed as others, fight with grassEater, eat animal 
class Enemy extends LivingCreature{
    constructor(x, y, en, sex) {
        super(x, y)
        this.col = "black";
        this.energy =en;
        this.index = 5;
        this.sex = sex;
        this.canBreed =0;
        //sex = 0 -> female
        //ses = 1 -> male 
    }
    chooseCell(index_number) {
        super.getNewCoords();
        return super.chooseCell(index_number)
    }
    eat() {
        if (this.energy <= 15) {
            this.getNewCoords();
            var newAnimal = random(this.chooseCell(3));
            if (newAnimal) {
                matrix[this.y][this.x] = 0;
                matrix[newAnimal[1]][newAnimal[0]] = 5;
                this.x = newAnimal[0];
                this.y = newAnimal[1];
                for (var i in animalArr) {
                    if (this.x == animalArr[i].x && animalArr[i].y == this.y) {
                        animalArr.splice(i, 1);
                        this.energy +=2;
                        //console.log("eating")
                    }
                }
                // var index = grassEaterArr.indexOf(newGrass);// GrassEater, [0,1]
                // grassEaterArr.splice(index, 1);
                //console.log("animal's energy is   " + this.energy);
            }
        }
    }
    move(season) {
        // console.log(this.energy);
        this.getNewCoords();
        var newCell = random(this.chooseCell(0));
        if (newCell) {  
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 5;
            this.x = newCell[0];
            this.y = newCell[1];
            if(season != "winter")
                this.energy--;
        }
    }
   
    fight() {
        if (this.energy > 0) {
            this.getNewCoords();
            var findGrEater = random(this.chooseCell(2));
            //console.log(findGrEater, grassEaterArr);
            if (findGrEater) {
                for (var i in grassEaterArr) {
                    if (grassEaterArr[i].x == findGrEater[0] && grassEaterArr[i].y == findGrEater[1]) {
                        return grassEaterArr[i].fight(this);
                    }
                }
            }
        }
    }

    breed(season) {
        this.canBreed++;
        if (this.energy > 2 && this.sex == 0) {
            //console.log(this.sex)
            var newEnemy = this.chooseCell(5);
            var newCell = random(this.chooseCell(0))
            /* newEnemy.sex == 1, can't put this condition cause newEnemy isn't an object */
            if (newEnemy && newCell && this.canBreed >= 2) {
                var newEnemy = new Enemy(newCell[0], newCell[1], Math.round(Math.random()));
                enemyArr.push(newEnemy);
                matrix[newCell[1]][newCell[0]] = 2;
                if(season !="spring" || season != "automn")
                    this.energy--;
                    this.canBreed = 0;
                //console.log("breeding")
            }
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in enemyArr) {
                if (this.x == enemyArr[i].x && this.y == enemyArr[i].y) {
                    enemyArr.splice(i, 1);
                }
            }
            //console.log("ENEMY's is dead  ");
            //   console.log("Animal is dead");
        }
    }
}