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
        redraw();
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
    // console.log(JSON.stringify(world));
    var outputText = '<p>Copy and paste the following and save as a JSON file.</p><code><pre>' + JSON.stringify(world) + '</pre></code>';
    var output;
    if($('#output').length > 0) {
        output = $('#output');
    } else {
        output = $('<div id="output" />').appendTo('body');
    }
    output.html(outputText).modal();
}
