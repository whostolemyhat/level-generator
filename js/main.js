$(document).ready(function() {

    $('.controls a').click(function(e) {
        e.preventDefault();
    });

    $('#newWorld').click(function() {
        recreate({
            birthLimit: $('#birthLimit').val(),
            deathLimit: $('#deathLimit').val(),
            initialSteps: $('#initialChance').val(),
            numberSteps: $('#numberSteps').val()
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

    init();

});
