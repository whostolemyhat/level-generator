var world = [[]];

var worldWidth = 64;
var worldHeight= 48;

var tileWidth = 8;
var tileHeight = 8;
var canvas;
var world;

// game of life variables
var chanceToStartAlive = 0.4;
var deathLimit = 3;
var birthLimit = 4;
var numberOfSteps = 2;

function init() {
    canvas = document.getElementById('canvas');
    canvas.width = worldWidth * tileWidth;
    canvas.height = worldHeight * tileHeight;
    ctx = canvas.getContext("2d");

    world = generateMap();
    redraw();
}

function iterate() {
    world = step(world);
    redraw();
}

function recreate(form) {
    // expects array of 4 objects (key:value pairs)

    birthLimit = form['birthLimit'];
    deathLimit = form['deathLimit'];
    chanceToStartAlive = form['initialSteps'];
    numberOfSteps = form['numberSteps'];

    world = generateMap();
    redraw();
}

function generateMap() {
    var map = [[]];
    // randomly scatter solid blocks
    initialiseMap(map);

    for(var i = 0; i < numberOfSteps; i++) {
        map = step(map);
    }

    return map;
}

function initialiseMap(map) {
    for(var x = 0;  x < worldWidth; x++) {
        map[x] = [];
        for(var y = 0; y < worldHeight; y++) {
            map[x][y] = 0;
        }
    }

    for(var x = 0; x < worldWidth; x++) {
        for(var y = 0; y < worldHeight; y++) {
            if(Math.random() < chanceToStartAlive) {
                map[x][y] = 1;
            }
        }
    }

    return map;
}

function step(map) {
    var newMap = [[]];
    for(var x = 0; x < map.length; x++) {
        newMap[x] = [];
        for(var y = 0; y < map[0].length; y++) {
            var nbs = countAliveNeighbours(map, x, y);
            if(map[x][y] > 0) {
                // check if should die
                if(nbs < deathLimit) {
                    newMap[x][y] = 0;
                } else {
                    newMap[x][y] = 1;
                }
            } else {
                // tile currently empty
                if(nbs > birthLimit) {
                    newMap[x][y] = 1;
                } else {
                    newMap[x][y] = 0;
                }
            }
        }
    }

    return newMap;
}

function countAliveNeighbours(map, x, y) {
    var count = 0;
    for(var i = -1; i < 2; i++) {
        for(var j = -1; j < 2; j++) {
            var nb_x = i + x;
            var nb_y = j + y;
            if(i === 0 && j === 0) {
                // pass
            } else if(nb_x < 0 || nb_y < 0 || nb_x >= map.length || nb_y >= map[0].length) {
                // if at the edge, consider it a solid
                count = count + 1;
            } else if(map[nb_x][nb_y] === 1) {
                count = count + 1;
            }
        }
    }

    return count;
}

function placeTreasure() {
    var treasureHiddenLimit = 5;
    for(var x = 0; x < worldWidth; x++) {
        for( var y = 0; y < worldHeight; y++) {
            if(world[x][y] === 0) {
                var nbs = countAliveNeighbours(world, x, y);
                if(nbs >= treasureHiddenLimit) {
                    world[x][y] = 2;
                }
            }
        }
    }

    redraw();
}

function redraw() {
    // clear screen
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(var x = 0; x < worldWidth; x++) {
        for(var y = 0; y < worldHeight; y++) {
            if(world[x][y] === 0) {
                ctx.fillStyle = '#3355aa';
            } else if(world[x][y] === 2) {
                ctx.fillStyle = '#f1d437';
            } else {
                ctx.fillStyle = '#433';
            }

            ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
        }
    }
}

function exportMap() {
    console.log(world);
}
