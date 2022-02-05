$(document).ready(function(){
    var numsAddition;
    var currentScore = 0;
    var timePassed = 10;

    var updateCurrentScore = function (action) {
        var addScoreToDom = function () {
            $('#current-score').html(`Current Score: ${currentScore}`);
        }

        // var addOnePoint = function () {
        //     ++currentScore;
        // }

        // var removeOnePoint = function () {
        //     --currentScore;
        // }

        // var restartPoints = function () {
        //     currentScore = 0;
        // }

        switch (action) {
            case 'add':
                ++currentScore;
                break;
            case 'remove':
                --currentScore;
                break;
            case 'restart':
                currentScore = 0;
                break;
            default:
                break;
        }

        addScoreToDom();
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

    var restartGame = function () {
        updateCurrentScore('restart');
    }

    var startCountdown = function () {
        $('input').off('keyup.number');
        var timer = null;

        var startTimer = function () {
            if (!timer) {
                timer = setInterval(function () {
                    timePassed -= 1;
                    console.log(`inner function timepassed: ${timePassed}`);

                    $("#timer").html(timePassed);

                    if (timePassed <= 0) {
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
    
    $('input').on('keyup.number', function (e) {
        if (Number(this.value) || this.value === '0') {
            startCountdown();
            $('input').on('keyup.number');
        }
    });

    $("input").on('keyup', function (e) {
        var userInput = Number(this.value);        
        if (e.key === 'Enter' || e.keyCode === 13) {
            if (userInput === numsAddition) {
                console.log(`correct!`);
                createNums();
                $(this).val('');
                updateCurrentScore('add');
                ++timePassed;
                console.log(`the other timepassed: ${timePassed}`);
                $("#timer").html(timePassed);

            } else {
                console.log(`incorrect!`)
                $(this).val('');
                updateCurrentScore('remove');
            }
        }
    });

    createNums();
});