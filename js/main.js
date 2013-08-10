$(document).ready(function() {

    $('.controls a').click(function(e) {
        e.preventDefault();
    });

    $('#newWorld').click(function() {
        recreate({
            birthLimit: $('#birthLimit').val(),
            deathLimit: $('#deathLimit').val(),
            initialSteps: $('#initialChance').val(),
            numberSteps: $('#numberSteps').val(),
            mapWidth: $('#mapWidth').val(),
            mapHeight: $('#mapHeight').val(),
            islandToggle: $('#values input[type="radio"]:checked').val()
        }); 
    });
    $('#simulateStep').click(function() {
        iterate();
    });
    $('#placeTreasure').click(function() {
        placeTreasure();
    });
    $('#export').click(function() {
        exportMap();
    });
    $('#values input[type="radio"]').change(function() {
        toggleIslands({
            islandToggle: $('#values input[type="radio"]:checked').val()
        });
    })

    $('#options-trigger').click(function(e) {
        e.preventDefault();
        $('#values').slideToggle();
        $(this).toggleClass('active');
    });

    init();

});

function exportMap() {
    console.log(JSON.stringify(world));
    var output = $('<div id="output"><pre><code>' + JSON.stringify(world) + '</code></pre></div>');
    output.appendTo('body').slideDown();
}
