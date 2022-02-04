$(document).ready(function(){

    var createNums = function () {
        var addNumToDom = function (numID, num) {
            $(numID).html(num);
        }
        
        var getRandomNum = function() {
            return Math.floor(Math.random() * (9 - 0 + 1) + 0);
        }

        addNumToDom(`#first-num`, getRandomNum());
        addNumToDom(`#second-num`, getRandomNum());
    }


    var restartGame = function () {

    }

    var startCountdown = function () {
        $('input').off();
        var timePassed = 0;
        var timer = null;
        var startTime;
        
        var startTimer = function () {
          if (!timer) {
            startTime = 10;
            secondsPassed = 1;
            timer = setInterval(function () {
                timePassed = startTime - secondsPassed;

                $("#timer").html(timePassed);
                
                if (timePassed <= 0) {
                    stopTimer();
                    restartGame();
                }

                secondsPassed += 1;
            }, 1000); // Executed every 1 second
          }
        };
        
        var stopTimer = function () {
          window.clearInterval(timer);
          timer = null;
        };

        startTimer();
    }
    
    $('input').keyup(function (event) {
        if (Number(this.value) || this.value === '0') {
            startCountdown();
            $('input').on();
        };
    });

    createNums();
});