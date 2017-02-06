if (untangleGame === undefined) {
    var untangleGame = {};
}
untangleGame.layers = [];
$(document).ready(function () {
    // var canvas = document.getElementById("game");
    // untangleGame.ctx = canvas.getContext("2d");
    // prepare layer 0 (bg)
    var canvas_bg = document.getElementById("bg");
    untangleGame.layers[0] = canvas_bg.getContext("2d");

    // prepare layer 1 (guide)
    var canvas_guide = document.getElementById("guide");
    untangleGame.layers[1] = canvas_guide.getContext("2d");

    // prepare layer 2 (game)
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    untangleGame.layers[2] = ctx;

    // prepare layer 3 (ui)
    var canvas_ui = document.getElementById("ui");
    untangleGame.layers[3] = canvas_ui.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    // untangleGame.createRandomCircles(width, height);
    // untangleGame.connectCircles();
    untangleGame.handleInput();
    untangleGame.setupCurrentLevel();
    untangleGame.loadImages();
    setInterval(gameloop, 30);

    function gameloop() {
        untangleGame.clear(2);
        untangleGame.clear(3);

        untangleGame.drawAllLines();
        untangleGame.drawAllCircles();
        untangleGame.drawLevelProgress();
        untangleGame.dimUILayerIfNeeded();
        // clear the canvas before re-drawing.
        // untangleGame.clear();
        // untangleGame.drawBackground();
        // untangleGame.drawAllLines();

        // untangleGame.drawAllCircles();

        // untangleGame.drawLevelProgress();
        // untangleGame.drawGuide();
    }
})

