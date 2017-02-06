if (untangleGame === undefined) {
    var untangleGame = {};
}

//核心思想是，setInterval 清空所有显示，不停的刷新数组数据到显示上，鼠标拖拽修改数组内容，即改变显示了
untangleGame.handleInput = function () {
    // 添加鼠标事件监听给canvas，如果鼠标移动到圆圈位置，将该圆圈作为拖动目标
    $("#layers").on("mousedown touchstart", function (e) {
        e.preventDefault();
        // touch or mouse position
        var touch = e.originalEvent.touches && e.originalEvent.touches[0];
        var pageX = (touch || e).pageX;
        var pageY = (touch || e).pageY;

        var canvasPosition = $(this).offset();
        var mouseX = pageX - canvasPosition.left;
        var mouseY = pageY - canvasPosition.top;
        for (var index in untangleGame.circles) {
            var circleX = untangleGame.circles[index].x;
            var circleY = untangleGame.circles[index].y;
            var radius = untangleGame.circles[index].radius;
            // 鼠标与圆心的距离小于半径
            if (Math.pow(mouseX - circleX, 2) + Math.pow(mouseY - circleY, 2) < Math.pow(radius, 2)) {
                untangleGame.targetCircleIndex = index;
                break;
            }
        }
    });

    //当鼠标移动的时候圆也跟着动
    $("#layers").on("mousemove touchmove", function (e) {
        if (untangleGame.targetCircleIndex !== undefined) {
            e.preventDefault();
            // touch or mouse position
            var touch = e.originalEvent.touches && e.originalEvent.touches[0];
            var pageX = (touch || e).pageX;
            var pageY = (touch || e).pageY;

            var canvasPosition = $(this).offset();
            var mouseX = pageX - canvasPosition.left;
            var mouseY = pageY - canvasPosition.top;
            var circle = untangleGame.circles[untangleGame.targetCircleIndex];
            circle.x = mouseX;
            circle.y = mouseY;
        }
        untangleGame.connectCircles();
        untangleGame.updateLineIntersection();
        untangleGame.updateLevelProgress();
    });

    //鼠标抬起时候清空target数据
    $("#layers").bind("mouseup touchend", function (e) {
        untangleGame.targetCircleIndex = undefined;
        untangleGame.checkLevelCompleteness();
    });
};
