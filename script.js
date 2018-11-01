var grassArr = [];
var grassEaterArr = [];
var animalArr = [];
var flowerArr = [];
var enemyArr = [];
var matrix = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 1, 0, 0, 2, 0, 2, 2, 2, 0, 1, 2, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 2, 3, 2, 2, 1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 0, 2, 2, 2, 4, 0, 2, 1, 2, 2, 1, 1],
    [1, 1, 4, 0, 0, 0, 2, 0, 0, 0, 1, 2, 3, 0, 1, 1, 1],
    [1, 2, 2, 0, 0, 0, 3, 0, 2, 3, 0, 1, 1, 1, 0, 0, 1],
    [1, 1, 0, 2, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 0, 4, 0, 2, 1, 1, 1, 0, 3, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

/*var matrix=[
[0,0,0,1,0],
[0,1,1,0,1],
[0,1,1,2,1],
[0,0,3,1,1]
]
*/
var side = 90;

function setup() {
    frameRate(1);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr);
            } else if (matrix[y][x] == 2) {
                var grter = new GrassEater(x, y)
                grassEaterArr.push(grter);

            } else if (matrix[y][x] == 3) {
                var an = new Animal(x, y)
                animalArr.push(an);
            } else if (matrix[y][x] == 4) {
                var fl = new Flower(x, y)
                flowerArr.push(an);
            } else if (matrix[y][x] == 5) {
                var en = new Enemy(x, y)
                enemyArr.push(an);

            }
        }
    }
}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 4) {
                fill("white");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 5) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
        }
    }

    for (var i in grassArr) {
        grassArr[i].breed();

    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].move();
        grassEaterArr[i].eat();
        grassEaterArr[i].breed();
        //grassEaterArr[i].fight();
        grassEaterArr[i].die();
    }
    for (var i in animalArr) {
        animalArr[i].move();
        animalArr[i].eat();
        animalArr[i].breed();
        animalArr[i].die();
    }
    for (var i in enemyArr) {
        enemyArr[i].move();
        enemyArr[i].breed();
        if (enemyArr[i].fight()) break;
        enemyArr[i].die();
    }

}




//random    
/*    for (var i = 0; i < 10; i++) {
        matrix.push([]);
        for (var j = 0; j < 10; j++) {
            var a = Math.round(Math.random());
            matrix[i].push(a)
            matrix[i][j] = a;
        }

    }

    return matrix;

}
*/