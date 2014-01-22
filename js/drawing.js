// Visual - won't affect map output
var tileWidth = 10;
var tileHeight = 10;
var canvas;
var lightColour = '#3355aa';
var darkColour = '#433';
var landColour = '#90be7d';
var seaColour = '#81c6ed';
var treasureColour = '#f1d437';

// map variables
var world = [[]];
var drawIslands = false;


function init() {
    canvas = document.getElementById('canvas');
    canvas.width = Generator.worldWidth * tileWidth;
    canvas.height = Generator.worldHeight * tileHeight;
    ctx = canvas.getContext("2d");

    world = Generator.generateMap();
    redraw();
}

function iterate() {
    world = Generator.step(world);
    redraw();
}

function recreate(form) {
    // expects array of objects (key:value pairs)
    Generator.birthLimit = form['birthLimit'];
    Generator.deathLimit = form['deathLimit'];
    Generator.chanceToStartAlive = form['initialSteps'];
    Generator.numberOfSteps = form['numberSteps'];
    Generator.worldWidth = form['mapWidth'] || Generator.worldWidth;
    Generator.worldHeight = form['mapHeight'] || Generator.worldHeight;
    if(form['islandToggle'] === 'islands') {
        drawIslands = true;
    } else {
        drawIslands = false;
    }

    canvas.width = Generator.worldWidth * tileWidth;
    canvas.height = Generator.worldHeight * tileHeight;

    world = Generator.generateMap();
    redraw();
}

function toggleIslands(form) {
    if(form['islandToggle'] === 'islands') {
        drawIslands = true;
    } else {
        drawIslands = false;
    }
    redraw();
}


function placeTreasure() {
    var treasureHiddenLimit = 5;

    Generator.placeTreasure(treasureHiddenLimit);
    // for(var x = 0; x < Generator.worldWidth; x++) {
    //     for( var y = 0; y < Generator.worldHeight; y++) {
    //         if(world[x][y] === 0) {
    //             var nbs = Generator.countAliveNeighbours(world, x, y);
    //             if(nbs >= treasureHiddenLimit) {
    //                 world[x][y] = 2;
    //             }
    //         }
    //     }
    // }

    redraw();
}

function redraw() {
    // clear screen
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(var x = 0; x < Generator.worldWidth; x++) {
        for(var y = 0; y < Generator.worldHeight; y++) {

            if(world[x][y] === 0) {
                if(drawIslands) {
                    // land
                    ctx.fillStyle = landColour;
                } else {
                    // empty cave
                    ctx.fillStyle = lightColour;
                }
            } else if(world[x][y] === 2) {
                ctx.fillStyle = treasureColour;
            } else {
                if(drawIslands) {
                    // sea
                    ctx.fillStyle = seaColour;
                } else {
                    // cave wall
                    ctx.fillStyle = darkColour;
                }
            }
            
            ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
        }
    }
}
