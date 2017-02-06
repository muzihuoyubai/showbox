if (untangleGame === undefined) {
    var untangleGame = {};
}
untangleGame.boldLineThickness = 5;
untangleGame.thinLineThickness = 1;
untangleGame.lines = [];
untangleGame.drawCircle = function (x, y, radius) {
    // var ctx = untangleGame.ctx;
    var ctx = untangleGame.layers[2];
    ctx.fillStyle = "GOLD";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

untangleGame.drawLine = function (x1, y1, x2, y2, thickness) {
    // var ctx = untangleGame.ctx;
    var ctx = untangleGame.layers[2];
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = thickness;
    ctx.strokeStyle = "#cfc";
    ctx.stroke();
}

untangleGame.connectCircles = function () {
    // //直线连接每一对圆
    // untangleGame.lines.length = 0;
    // for (var i = 0; i < untangleGame.circles.length; i++) {
    //     var startPoint = untangleGame.circles[i];
    //     for (var j = 0; j < i; j++) {
    //         var endPoint = untangleGame.circles[j];
    //         untangleGame.drawLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y, 1);
    //         untangleGame.lines.push(new untangleGame.Line(startPoint, endPoint, untangleGame.thinLineThickness));
    //     }
    // }
    var level = untangleGame.levels[untangleGame.currentLevel];
    untangleGame.lines.length = 0;
    for (var i in level.relationship) {
        var connectedPoints = level.relationship[i].connectedPoints;
        var startPoint = untangleGame.circles[i];
        for (var j in connectedPoints) {
            var endPoint = untangleGame.circles[connectedPoints[j]];
            untangleGame.lines.push(new untangleGame.Line(startPoint, endPoint, untangleGame.thinLineThickness));
        }
    }
}

untangleGame.clear = function (layerIndex) {
    var ctx = untangleGame.layers[layerIndex];
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

// untangleGame.clear = function () {
//     var ctx = untangleGame.ctx;
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
// }

untangleGame.drawAllLines = function () {

    for (var index in untangleGame.lines) {
        var line = untangleGame.lines[index];
        untangleGame.drawLine(line.startPoint.x, line.startPoint.y, line.endPoint.x, line.endPoint.y, line.thickness);
    }
}

untangleGame.drawAllCircles = function () {
    for (var index in untangleGame.circles) {
        var circle = untangleGame.circles[index];
        untangleGame.drawCircle(circle.x, circle.y, circle.radius);
    }
}

untangleGame.drawLevelProgress = function () {
    var ctx = untangleGame.layers[3];
    ctx.font = "26px Arail";
    ctx.fillStyle = "WHITE";
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.fillText("Puzzle" + untangleGame.currentLevel + ", Completeness:" + untangleGame.levelProgress + "%", 60, ctx.canvas.height - 60);
}

untangleGame.loadImages = function () {
    untangleGame.background = new Image();
    untangleGame.background.onerror = function () {
        console.log("Error loading the image.");
    }
    untangleGame.background.onload = function () {
        untangleGame.drawBackground();
    }
    untangleGame.background.src = "images/board.png";
    untangleGame.guide = new Image();
    untangleGame.guide.onload = function () {
        untangleGame.guideFrame = 0;
        setInterval(untangleGame.guideNextFram, 500);
    }
    untangleGame.guide.src = "images/guide_sprite.png";
};

untangleGame.guideNextFram = function () {
    untangleGame.guideFrame++;
    if (untangleGame.guideFrame > 5) {
        untangleGame.guideFrame = 0;
    }
    untangleGame.clear(1);
    untangleGame.drawGuide();
}

untangleGame.drawGuide = function () {
    var ctx = untangleGame.layers[1];
    if (untangleGame.currentLevel < 2) {
        var nextFrameX = untangleGame.guideFrame * 80;
        ctx.drawImage(untangleGame.guide, nextFrameX, 0, 80, 130, 325, 130, 80, 130);
    }
    if (untangleGame.currentLevel === 1) {
        $("#guide").addClass('fadeout');
    }
}

untangleGame.drawBackground = function () {
    var ctx = untangleGame.layers[0];
    ctx.drawImage(untangleGame.background, 0, 0);
}

untangleGame.dimUILayerIfNeeded = function () {
    // get all circles,
    // check if the ui overlap with the game objects
    var isOverlappedWithCircle = false;
    for (var i in untangleGame.circles) {
        var point = untangleGame.circles[i];
        if (point.y > 280) {
            isOverlappedWithCircle = true;
        }
    }
    if (isOverlappedWithCircle) {
        $("#ui").addClass('dim');
    } else {
        $("#ui").removeClass('dim');
    }
};