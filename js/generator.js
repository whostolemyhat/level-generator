var Generator = {
    // game of life variables
    chanceToStartAlive: 0.4,
    deathLimit: 3,
    birthLimit: 4,
    numberOfSteps: 2,
    worldWidth: 64,
    worldHeight: 48,

    generateMap: function() {
        var map = [[]];
        // randomly scatter solid blocks
        this.initialiseMap(map);

        for(var i = 0; i < this.numberOfSteps; i++) {
            map = this.step(map);
        }

        return map;
    },

    initialiseMap: function(map) {
        for(var x = 0;  x < this.worldWidth; x++) {
            map[x] = [];
            for(var y = 0; y < this.worldHeight; y++) {
                map[x][y] = 0;
            }
        }

        for(var x = 0; x < this.worldWidth; x++) {
            for(var y = 0; y < this.worldHeight; y++) {
                if(Math.random() < this.chanceToStartAlive) {
                    map[x][y] = 1;
                }
            }
        }

        return map;
    },

    step: function(map) {
        var newMap = [[]];
        for(var x = 0; x < map.length; x++) {
            newMap[x] = [];
            for(var y = 0; y < map[0].length; y++) {
                var nbs = this.countAliveNeighbours(map, x, y);
                if(map[x][y] > 0) {
                    // check if should die
                    if(nbs < this.deathLimit) {
                        newMap[x][y] = 0;
                    } else {
                        newMap[x][y] = 1;
                    }
                } else {
                    // tile currently empty
                    if(nbs > this.birthLimit) {
                        newMap[x][y] = 1;
                    } else {
                        newMap[x][y] = 0;
                    }
                }
            }
        }

        return newMap;
    },

    countAliveNeighbours: function(map, x, y) {
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
    },

    placeTreasure: function(limit) {
        for(var x = 0; x < this.worldWidth; x++) {
            for( var y = 0; y < this.worldHeight; y++) {
                if(world[x][y] === 0) {
                    var nbs = this.countAliveNeighbours(world, x, y);
                    if(nbs >= limit) {
                        world[x][y] = 2;
                    }
                }
            }
        }
    }
}
