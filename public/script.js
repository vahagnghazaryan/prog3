var socket = io.connect('http://localhost:3000');
var grassArr = [];
var grassEaterArr = [];
var animalArr = [];
var flowerArr = [];
var enemyArr = [];
var waterArr = [];

var matrix = [
    [1, 1, 1, 1, 1, 4, 1, 2, 1, 4, 5, 1, 1, 1, 1, 1, 2, 0, 1, 0],
    [2, 2, 2, 2, 2, 4, 1, 2, 1, 1, 5, 5, 2, 2, 2, 1, 2, 1, 1, 0],
    [1, 1, 0, 2, 2, 4, 1, 0, 2, 1, 2, 4, 2, 0, 2, 1, 2, 0, 1, 0],
    [1, 1, 0, 2, 2, 5, 0, 0, 2, 2, 2, 5, 2, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 0, 2, 0, 2, 2, 4, 4, 0, 2, 4, 1, 1, 2, 3, 0, 0, 1, 0],
    [1, 2, 1, 0, 0, 1, 0, 0, 0, 0, 2, 5, 1, 3, 2, 3, 0, 0, 0, 0],
    [1, 1, 1, 2, 0, 1, 1, 1, 0, 1, 2, 4, 3, 0, 1, 1, 2, 3, 1, 0],
    [1, 0, 0, 2, 2, 0, 3, 3, 3, 3, 4, 2, 2, 0, 0, 0, 1, 3, 0, 1],
    [1, 2, 0, 0, 4, 0, 4, 4, 4, 6, 4, 4, 2, 1, 0, 0, 1, 3, 0, 1],
    [1, 3, 0, 0, 0, 0, 6, 1, 2, 2, 3, 2, 2, 0, 0, 2, 1, 3, 3, 1],
    [1, 1, 5, 4, 6, 3, 6, 6, 6, 6, 3, 0, 2, 4, 4, 0, 0, 0, 4, 1],
    [1, 2, 1, 1, 4, 1, 1, 3, 4, 4, 4, 1, 1, 1, 2, 4, 2, 0, 3, 1],
    [1, 2, 0, 0, 0, 1, 4, 1, 1, 3, 5, 1, 2, 2, 1, 4, 2, 0, 3, 1],
    [1, 1, 0, 0, 1, 1, 1, 1, 0, 3, 0, 1, 2, 2, 1, 1, 0, 1, 1, 1],
    [1, 1, 0, 0, 0, 5, 1, 1, 1, 1, 2, 1, 0, 4, 2, 1, 3, 2, 4, 1],
    [1, 1, 0, 1, 1, 2, 2, 2, 2, 3, 0, 1, 2, 0, 1, 1, 3, 0, 3, 1],
    [1, 1, 1, 1, 0, 2, 2, 2, 0, 0, 0, 0, 1, 1, 2, 2, 0, 3, 4, 1],
    [0, 0, 1, 1, 0, 2, 0, 0, 0, 1, 1, 1, 1, 2, 2, 0, 0, 3, 3, 1],
    [0, 1, 0, 0, 1, 2, 2, 1, 1, 4, 0, 4, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1]
];


var statistics = {
    "timestamp": "",
    "winter_count":0,
    "spring_count":0,
    "summer_count":0,
    "automn_count":0,
    "mutation_count":0,
    "grass":0,
    "grassEater":0,
    "animal":0,
    "enemy":0,
    "flower":0,
    "water":0,
    "framecount": 0
}

var mX = matrix[0].length - 1
var mY = matrix.length - 1

var side = 30;
// make spring season in our game by default 
var k = 0;
document.body.style.backgroundImage = "url('../img/spring.png')";

function change_season() {
    if (k == 0)
    {
        document.body.style.backgroundImage = "url('../img/spring.png')";
        statistics.spring_count++;
    }
        
    if (k >= 0 && k < 10)
        season = "spring"
    if (k == 10)
    {
        document.body.style.backgroundImage = "url('../img/summer.png')";
        statistics.summer_count++;
    }
        
    if (k >= 10 && k < 20)
        season = "summer"
    if (k == 20)
    {
        document.body.style.backgroundImage = "url('../img/automn.png')";
        statistics.automn_count++;
    }
        
    if (k >= 20 && k < 30)
        season = "automn"
    if (k == 30)
    {
        document.body.style.backgroundImage = "url('../img/winter.png')";
        statistics.winter_count++;
    }
        
    if (k >= 30 && k < 40)
        season = "winter"
    return season;
}

function set_interface(season) {
    // create main interface for game 
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            //ground
            if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            //grass
            else if (matrix[y][x] == 1) {
                if (season == "winter")
                    fill("#FFFAFA");
                else
                    fill("green");
                rect(x * side, y * side, side, side);
            }
            //grassEater
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            //animal
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            //flower 
            else if (matrix[y][x] == 4) {
                fill("#FF1493");
                rect(x * side, y * side, side, side);
            }
            //enemy 
            else if (matrix[y][x] == 5) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            // water 
            else if (matrix[y][x] == 6) {
                if (season == "winter")
                    fill("#104E8B");
                else
                    fill("#1874CD");
                rect(x * side, y * side, side, side);
            }
        }
    }
}

function characters_setup() {
    // setup of all charecters in default order 

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            //grass
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr);
            }//grassEater 
            else if (matrix[y][x] == 2) {
                var grter = new GrassEater(x, y, Math.round(Math.random()))
                grassEaterArr.push(grter);
            }//animal
            else if (matrix[y][x] == 3) {
                var an = new Animal(x, y, Math.round(Math.random()))
                animalArr.push(an);
            }//flower
            else if (matrix[y][x] == 4) {
                var fl = new Flower(x, y)
                flowerArr.push(fl);
            }//enemy 
            else if (matrix[y][x] == 5) {
                var en = new Enemy(x, y, Math.round(Math.random()))
                enemyArr.push(en);

            }//water
            else if (matrix[y][x] == 6) {
                var wt = new Water(x, y)
                waterArr.push(wt);
            }
        }
    }
}


function action(season) {
    // the action part of our game 
    //grass
    for (var i in grassArr) {
        if (season == "winter")
            grassArr[i].freeze();
        else if (season == "automn")
            grassArr[i].dry();
        else
            grassArr[i].breed();

        grassArr[i].die();
    }
    //grassEater
    for (var i in grassEaterArr) {
        grassEaterArr[i].move(season);
        grassEaterArr[i].eat(season);
        grassEaterArr[i].breed(season);
        //grassEaterArr[i].fight();
        grassEaterArr[i].die();
    }
    //animal
    for (var i in animalArr) {
        animalArr[i].move(season);
        animalArr[i].eat(season);
        animalArr[i].breed();
        animalArr[i].die();
    }
    //enemy
    for (var i in enemyArr) {
        enemyArr[i].eat();
        enemyArr[i].move(season);
        enemyArr[i].breed(season);
        if (enemyArr[i].fight())
            break;
        enemyArr[i].die();
    }
    //water
    for (var i in waterArr) {
        waterArr[i].die();
        if (season == "winter")
            waterArr[i].freeze();
        else if (season == "summer")
            waterArr[i].drain();
        else
            waterArr[i].spread();
    }
    //flower
    for(var i in flowerArr)
    {   
       if(season == "spring")
        {
            flowerArr[i].breed()
        }
    }
    statistics.animal = animalArr.length
    statistics.flower = flowerArr.length
    statistics.grass = grassArr.length
    statistics.grassEater = grassEaterArr.length
    statistics.water = waterArr.length
    statistics.enemy = enemyArr.length
}
function mouseClicked() {
    statistics.mutation_count++;
    document.body.style.backgroundImage = "url('../img/red.png')";
    for (var i in grassEaterArr) {
        grassEaterArr[i].mutation();
    }
    for (var i in waterArr) {
        waterArr[i].mutation();
    }
    //console.log(grassEaterArr)
    console.log(grassArr)
}
function setup() {

    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    characters_setup();
}
function draw() {
    if (frameCount % 50 === 0) {
        statistics.timestamp = (new Date()).toString();
        statistics.framecount = frameCount;
        socket.emit("send data", statistics);
        //console.log(statistics)
    }
    season = change_season();
    action(season);
    set_interface(season);
    k++;
    if (k == 40)
        k = 0;
        
}






