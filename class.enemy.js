// the black one, move, die and breed as others, fight with grassEater 
class Enemy extends LivingCreature{
    constructor(x, y, en) {
        super(x, y)
        this.col = "black";
        this.energy = en;
        this.index = 5;
    }
    chooseCell(index_number) {
        super.getNewCoords();
        return super.chooseCell(index_number)
    }

    move() {
        // console.log(this.energy);
        this.getNewCoords();
        var newCell = random(this.chooseCell(0));
        if (newCell) {  
            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 5;
            this.x = newCell[0];
            this.y = newCell[1];
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

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in enemyArr) {
                if (this.x == enemyArr[i].x && this.y == enemyArr[i].y) {
                    enemyArr.splice(i, 1);
                }
            }
            console.log("ENEMY's is dead  ");
            //   console.log("Animal is dead");
        }
    }
}