class Animal extends LivingCreature{
    constructor(x, y) {
        super(x, y)
        this.energy = 5;
        this.col = "red";
        this.canBreed = 0;
        this.index = 3;
    }

    getNewCoords() {
        this.directions = [
            [this.x, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x, this.y + 1],
        ];
    }
    /////////
    chooseCell(index_number) {
        this.getNewCoords();
        return super.chooseCell(index_number)
    }

    move() {
        this.getNewCoords();
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
            this.getNewCoords();
            var newGrass = random(this.chooseCell(2));
            if (newGrass) {
                matrix[this.y][this.x] = 0;
                matrix[newGrass[1]][newGrass[0]] = 3;
                this.x = newGrass[0];
                this.y = newGrass[1];
                for (var i in grassEaterArr) {
                    if (this.x == grassEaterArr[i].x && grassEaterArr[i].y == this.y) {
                        grassEaterArr.splice(i, 1);
                        this.energy++;
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
                this.energy--;
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