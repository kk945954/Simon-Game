let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let gameStarted = false;
let level = 0;
let startIndex = 0;
//console.log(randomChosenColor);
//console.log(gamePattern);

$(document).on("keypress", function () {
    if (!gameStarted) {
        gameStarted = true;
        nextSequence();
        $("#level-title").text("Level 1");
    }
})

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    level++;
    $("#level-title").text("Level " + level);
}

$(".btn").on("click", function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    let check = checkAnswer(startIndex);
    if (check == 1) {
        if (userClickedPattern.length !== gamePattern.length) {
            startIndex++;
        } else {
            setTimeout(function () {
                nextSequence();
            }, 1000);
            userClickedPattern.length = 0;
            startIndex = 0;
        }
    } else {
        new Audio("sounds/wrong.mp3").play();
        $("body").addClass("game-over"), setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        gameStarted = false;
    }
})

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        return 1;
    } else {
        return 0;
    }
}

function startOver() {
    level = 0;
    gamePattern.length = 0;
    userClickedPattern.length = 0;
    startIndex = 0;
}

function playSound(name) {
    $("#" + name).fadeOut(100).fadeIn(100);
    new Audio("sounds/" + name + ".mp3").play();
}

function animatePress(currentColor) {
    let $animateColor = $("." + currentColor);
    $animateColor.addClass("pressed"), setTimeout(function () {
        $animateColor.removeClass("pressed")
    }, 100)
}
