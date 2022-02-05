$(document).ready(function(){
    var numsAddition;
    var currentScore = 0;
    var highScore = 0;
    var timePassed = 10;

    var updateCurrentScore = function (action) {

        var addScoreToDom = function () {
            $('#current-score').html(`Current Score: ${currentScore}`);
        }

        switch (action) {
            case 'add':
                ++currentScore;
                addScoreToDom();
                break;
            case 'remove':
                --currentScore;
                addScoreToDom();
                break;
            case 'restart':
                currentScore = 0;
                addScoreToDom();
                break;
            default:
                break;
        }

    }

    var createNums = function () {
        var addNumToDom = function (numID, num) {
            $(numID).html(num);
            return num;
        }
        
        var getRandomNum = function() {
            return Math.floor(Math.random() * (9 - 1 + 1) + 1);
        }

        var firstNum = addNumToDom(`#first-num`, getRandomNum());
        var secondNum = addNumToDom(`#second-num`, getRandomNum());
        numsAddition =  firstNum + secondNum;
    }

    var setHighScore = function() {
        if (currentScore > highScore) {
            highScore = currentScore;
        }

        $('#high-score').html(`High Score: ${highScore}`);

    }

    var restartGame = function () {

        var restartCountdown = function() {
            timePassed = 10;
            $("#timer").html(timePassed);
        }
        
        setHighScore();
        updateCurrentScore('restart');
        restartCountdown();
        $('input').on('keyup.number', startGame);
    }

    var startCountdown = function () {
        //turn off the event handler to avoid starting the timer several times
        $('input').off('keyup.number', startGame);
        var timer = null;

        var startTimer = function () {
            if (!timer) {
                timer = setInterval(function () {
                    timePassed -= 1;

                    $("#timer").html(timePassed);

                    if (timePassed < 0) {
                        stopTimer();
                        restartGame();
                    }

                }, 1000); // Executed every 1 second
            }
        };

        var stopTimer = function () {
            window.clearInterval(timer);
            timer = null;
        };

        startTimer();
    }

    var startGame = function (e) {
        if (Number(this.value) || this.value === '0') {
            startCountdown();
        }
    }
    
    $('input').on('keyup.number', startGame);

    $("input").on('keyup', function (e) {
        var userInput = Number(this.value);        
        if (e.key === 'Enter' || e.keyCode === 13) {
            if (userInput === numsAddition) {
                createNums();
                $(this).val('');
                updateCurrentScore('add');
                ++timePassed;
                $("#timer").html(timePassed);
            } else {
                $(this).val('');
                updateCurrentScore('remove');
            }
        }
    });

    createNums();
});