var grassArr = [];
var grassEaterArr = [];
var animalArr = [];
var flowerArr = [];
var enemyArr = [];

var matrix = [ 
        [1,1,1,1,1,4,1,0,0,4,4,1,1,1,1,1,0,0,1,0],
        [2,2,2,2,2,4,1,0,1,0,4,4,0,0,0,1,0,1,1,0],
        [1,0,0,2,2,4,0,0,1,1,0,4,0,0,0,1,0,0,1,0],
        [0,0,0,2,2,4,0,0,1,1,0,4,0,1,1,0,1,1,1,1],
        [1,0,0,2,0,4,4,4,4,0,2,4,1,1,0,3,0,0,1,0],
        [1,0,2,0,0,1,0,0,0,0,2,4,1,3,0,3,0,0,0,0],
        [1,0,2,2,0,1,1,1,0,1,2,4,3,0,1,1,3,3,1,0],
        [1,0,0,2,2,0,0,0,0,0,0,4,2,0,0,0,1,3,0,1],
        [0,3,0,0,2,0,3,0,4,0,0,4,2,1,0,0,1,3,0,1],
        [1,3,0,0,0,0,4,0,3,0,4,1,0,0,0,2,1,3,3,1],
        [0,1,3,3,3,3,3,1,3,1,0,0,4,4,4,0,0,0,3,1],
        [1,1,1,1,1,1,3,3,3,0,1,1,1,1,0,4,0,0,3,1],
        [1,1,0,0,0,1,3,1,1,3,4,1,0,0,1,4,2,0,3,1],
        [1,1,0,0,1,1,3,3,0,3,0,1,4,0,1,1,0,3,3,1],
        [1,1,0,0,0,2,2,3,3,3,4,1,0,4,0,1,3,2,3,1],
        [1,1,0,1,1,0,0,0,2,3,0,1,0,0,1,1,3,0,3,1],
        [1,1,1,1,0,0,0,0,0,0,0,0,1,1,2,2,0,3,3,1],
        [0,0,1,1,0,0,0,0,0,1,1,1,1,2,2,0,0,3,3,1],
        [0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
   ];
    


var mX = matrix[0].length-1
var mY = matrix.length-1

var side = 50;
// make spring season in our game by default 
var k = 0;
document.body.style.backgroundImage = "url('img/spring.png')";

function change_season(){
    //change bg images after 10 draw call 
    k++;
    if(k==10)
        document.body.style.backgroundImage = "url('img/summer.png')";
    if(k==20)
        document.body.style.backgroundImage = "url('img/automn.png')";
    if(k==30)
        document.body.style.backgroundImage = "url('img/winter.png')";
    if(k==40)
        document.body.style.backgroundImage = "url('img/spring.png')";
    if(k>40)
        k = 0;
}

function create_interface(){
    // create main interface for game 
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            
            if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            } 
            else if (matrix[y][x] == 1 ) {
                fill("green");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }else if (matrix[y][x] == 3) {
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
}

function characters_setup(){
    // setup of all charecters in default order 
    
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
                flowerArr.push(fl);
            } else if (matrix[y][x] == 5) {
                var en = new Enemy(x, y)
                enemyArr.push(en);

            }
        }
    }
}


function action(){
    // the action part of our game 
    for (var i in grassArr)
        grassArr[i].breed();

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
        if (enemyArr[i].fight()) 
            break;
        enemyArr[i].die();
    }
}


function setup() {

    frameRate(1);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    characters_setup();
    console.log(flowerArr)
}

function draw() {
    
    change_season();
    create_interface();
    action();

}





