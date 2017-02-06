if (untangleGame === undefined) {
    var untangleGame = {};
}

untangleGame.currentLevel = 0;
untangleGame.levelProgress = 0;

untangleGame.setupCurrentLevel = function () {
    untangleGame.circles = [];
    var level = untangleGame.levels[untangleGame.currentLevel];
    for (var index in level.circles) {
        untangleGame.circles.push(new untangleGame.Circle(level.circles[index].x, level.circles[index].y, 10));
    }

    untangleGame.levelProgress = 0;
    untangleGame.connectCircles();
    untangleGame.updateLineIntersection();
    untangleGame.checkLevelCompleteness();
    untangleGame.updateLevelProgress();

}

untangleGame.checkLevelCompleteness = function () {
    if (untangleGame.levelProgress === 100) {
        if (untangleGame.currentLevel + 1 < untangleGame.levels.length) {
            untangleGame.currentLevel++;
        }
        untangleGame.setupCurrentLevel();
    }
}

untangleGame.updateLevelProgress = function () {
    var progress = 0;
    for (var index in untangleGame.lines) {
        if (untangleGame.lines[index].thickness === untangleGame.thinLineThickness) {
            progress++;
        }
    }
    var progressPercentage = Math.floor(progress / untangleGame.lines.length * 100);
    untangleGame.levelProgress = progressPercentage;
    $("#progress").text(progressPercentage);

    $("#level").text(untangleGame.currentLevel);
}