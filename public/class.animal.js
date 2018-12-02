// red one , moves through his own directions, eats grass, if old enough and find partner around breed, die as others 
class Animal extends LivingCreature{

                    constructor(x, y, sex) {
                        super(x, y)
                        this.energy = 4;
                        this.col = "red";
                        this.canBreed = 0;
                        this.index = 3;
                        this.sex = sex 
                    }

                    getNewCoords() {
                        this.directions = [
                            [this.x, this.y - 1],
                            [this.x - 1, this.y],
                            [this.x + 1, this.y],
                            [this.x, this.y + 1],
                        ];
                    }
                    
                    chooseCell(index_number) {
                        this.getNewCoords();
                        return super.chooseCell(index_number)
                    }

                    move(season) {
                        this.getNewCoords();
                        var newCell = random(this.chooseCell(0));
                        if (newCell && season != "winter") {
                            matrix[this.y][this.x] = 0;
                            matrix[newCell[1]][newCell[0]] = 3;
                            this.x = newCell[0];
                            this.y = newCell[1];
                            this.energy--;
                        }

                        //console.log("animal's energy is   " + this.energy);
                    }
                  
                    eat(season) {
                        if (this.energy <= 15 && season !="winter") {
                            this.getNewCoords();
                            var newGrassEater = random(this.chooseCell(2));
                            if (newGrassEater) {
                                matrix[this.y][this.x] = 0;
                                matrix[newGrassEater[1]][newGrassEater[0]] = 3;
                                this.x = newGrassEater[0];
                                this.y = newGrassEater[1];
                                for (var i in grassEaterArr) {
                                    if (this.x == grassEaterArr[i].x && grassEaterArr[i].y == this.y) {
                                        grassEaterArr.splice(i, 1);
                                        this.energy +=2;
                                       // console.log("eating")
                                    }
                                }
                                // var index = grassEaterArr.indexOf(newGrass);// GrassEater, [0,1]
                                // grassEaterArr.splice(index, 1);
                               // console.log("animal's energy is   " + this.energy);
                            }
                        }
                    }

                    breed() {
                        this.canBreed++;
                        if (this.energy > 1 && this.sex == 0) {
                            var newAnimal = this.chooseCell(3);
                            var newCell = random(this.chooseCell(0))
                            /* newGrassEater.sex == 1, can't put this condition cause newAnimal isn't an object */
                            if (newAnimal && newCell && this.canBreed >= 1) {
                                var newAnimal = new Animal(newCell[0], newCell[1], Math.round(Math.random()));
                                animalArr.push(newAnimal);
                                matrix[newCell[1]][newCell[0]] = 3;
                                if(season != "spring")
                                {
                                    this.energy--;
                                    this.canBreed = 0;
                                }    
                                //console.log(" Animal breeds")
                            }
                        }
                    }

                    die() {

                        if (this.energy <= 0) {
                            matrix[this.y][this.x] = 0;
                            for (var i in animalArr) {
                                if (this.x == animalArr[i].x && animalArr[i].y == this.y) {
                                    animalArr.splice(i, 1);
                                }
                            }
                            //console.log("Animal is dead");
                        }

                    }

                }