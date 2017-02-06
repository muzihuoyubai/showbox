(function ($) {
    var matchingGame = {};
    matchingGame.deck = [
        'cardAK', 'cardAK',
        'cardAQ', 'cardAQ',
        'cardAJ', 'cardAJ',
        'cardBK', 'cardBK',
        'cardBQ', 'cardBQ',
        'cardBJ', 'cardBJ',
    ];
    $(function () {
        //洗牌
        matchingGame.deck.sort(shuffle);
        for (var i = 0; i < 11; i++) {
            //选第一个子元素复制
            $(".card:first-child").clone().appendTo("#cards");
        }
        $("#cards").children().each(function (index) {
            var x = ($(this).width() + 20) * (index % 4);
            var y = ($(this).height() + 20) * Math.floor(index / 4);
            $(this).css("transform", "translateX(" + x + "px) translateY(" + y + "px)");
            //拿一张牌
            var pattern = matchingGame.deck.pop();
            $(this).find(".back").addClass(pattern);
            $(this).attr("data-pattern", pattern);
            $(this).click(selectCard);

        });
        // reset the elapsed time to 0.
        matchingGame.elapsedTime = 0;

        // start the timer
        matchingGame.timer = setInterval(countTimer, 1000);
    })

    function countTimer() {
        matchingGame.elapsedTime++;

        // calculate the minutes and seconds from elapsed time
        var minute = Math.floor(matchingGame.elapsedTime / 60);
        var second = matchingGame.elapsedTime % 60;

        // add padding 0 if minute and second is less than 10
        if (minute < 10) minute = "0" + minute;
        if (second < 10) second = "0" + second;

        // display the elapsed time
        $("#elapsed-time").html(minute + ":" + second);
    }

    //随机乱序的算法，这个算法并不好
    function shuffle() {
        return 0.5 - Math.random();
    }

    function selectCard() {
        //翻开的卡片数量大于1个就什么也不干
        if ($(".card-flipped").length > 1) {
            return;
        }
        $(this).addClass("card-flipped");
        //翻开了2个卡片，7秒之后比较卡片
        if ($(".card-flipped").length === 2) {
            setTimeout(checkPattern, 700);
        }
    }

    function checkPattern() {
        if (isMatchPattern()) {
            $(".card-flipped").removeClass("card-flipped").addClass("card-removed");
            //transitionend 事件在 CSS 完成过渡后触发
            $(".card-removed").bind("transitionend", removeTookCards);
        } else {
            $(".card-flipped").removeClass("card-flipped");
        }
    }

    function isMatchPattern() {
        var cards = $(".card-flipped");
        var pattern = $(cards[0]).data("pattern");
        var anotherPattern = $(cards[1]).data("pattern");
        return (pattern === anotherPattern);
    }

    function removeTookCards() {
        $(".card-removed").remove();
        // check whether all cards are removed and show game over
        if ($(".card").length === 0) {
            gameover();
        }
    }

    function gameover() {
        // stop the timer
        clearInterval(matchingGame.timer);

        // set the score in the game over popup
        $(".score").html($("#elapsed-time").html());

        // show the game over popup
        $("#popup").removeClass("hide");
    }
})(jQuery)