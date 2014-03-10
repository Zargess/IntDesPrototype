var zero = [1, 3, 4, 5, 6, 7];
var one = [5, 7];
var two = [1, 5, 2, 6, 3];
var three = [1, 5, 2, 7, 3];
var four = [4, 2, 5, 7];
var five = [1, 4, 2, 7, 3];
var six = [1, 4, 2, 3, 6, 7];
var seven = [1, 5, 7];
var eight = [1, 2, 3, 4, 5, 6, 7];
var nine = [1, 2, 3, 4, 5, 7];
var currentNumber;
var custNumber;
var timer;
var showingTop = 52;
var orgLeft = 0;
var orgTop = 0;
var newNumber;

$(document).ready(function() {
    $("#drag .drg").draggable({
        cursor: 'move',
        revert: 'invalid',
        revertDuration: 900,
        containment: $("#pull-number"),
        stop: function() {
            var Stoppos = $(this).offset();
            newNumber = Stoppos.top >= "30";
        }
    });
    currentNumber = Math.floor(Math.random() * (60 - 10 + 1)) + 10;
    $("#pull-number").droppable({
        accept: ".drg",
        activeClass: '.drg',
        drop: function(event, ui) {
            var Stoppos = $(".drg").offset();
            newNumber = Stoppos.top >= "70";
            if (newNumber) {
                $(".panel").slideDown("slow");
                $(".drg").animate({
                    'top': showingTop,
                    'left': orgLeft
                }, 500);
                getCustNumber();
                $("#numberShower").text("Dit nummer er: " + custNumber);
                $(".pull-me").text("");
                $(".arrowContainer").hide();
                if (timer === undefined) {
                    beginTimer();
                }
                if (custNumber !== undefined) {
                    undoYourTurn();
                }
                newNumber = false;
            } else {
                $(".drg").animate({
                    'top': 0,
                }, 500);
            }
        }
    });
    currentNumber = Math.floor(Math.random() * (60 - 10 + 1)) + 10;
    constructNumbers();
    hideAll();
    updateNumbers(currentNumber);
});

function beginTimer() {
    var delay = Math.floor(Math.random() * (9000 - 3000 + 1)) + 3000;
    timer = setInterval(function() {
        if (custNumber !== undefined) {
            currentNumber++;
            if (currentNumber > 99) {
                currentNumber = 1;
            }
            updateNumbers(currentNumber);
            if (custNumber === currentNumber) {
                yourTurn(custNumber);
            }
        }
    }, delay);
}

function getCustNumber() {
    custNumber = currentNumber + Math.floor(Math.random() * (15 - 5 + 1)) + 5;
    if (custNumber > 99) {
        var temp = custNumber - 99;
        custNumber = 0 + temp;
    }
}

function yourTurn(no) {
    $(".drg").animate({
        'top': orgTop,
        'left': orgLeft
    }, 500, function() {
        $(".panel").slideUp("slow");
        $("#pull-number").css({background: "green"});
        var time = function() {
            return new Date.getTime();
        };
        $("#messageBox").text("Det er din tur!\nDit nummer: " + no + "\nTidspunkt: " + getDate());
        $(".pull-me").text("Træk et nyt nummer");
    });
}

function getDate() {
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
    return datetime;
}

function undoYourTurn() {
    $("#messageBox").text("");
    $("#pull-number").css({background: "white"});
}

function constructNumbers() {
    var clock = $('#clock');

    // This object will hold the digit elements
    var digits = {};

    // Positions for the tens and ones
    var positions = [
        'h1', 'h2'
    ];
    var digit_holder = clock.find('.digits');

    $.each(positions, function() {
        var pos = $('<div>');

        for (var i = 1; i < 8; i++) {
            var span = '<span id="' + i + " " + this + '" class="d' + i + '">';
            pos.append(span);
        }

        // Set the digits as key:value pairs in the digits object
        digits[this] = pos;

        // Add the digit elements to the page
        digit_holder.append(pos);

    });
}

function updateNumbers(no) {
    var numbers = (no + "").split("");
    var tens;
    var ones;
    if (numbers.length === 1) {
        tens = 0;
        ones = numbers[0];
    } else {
        tens = numbers[0];
        ones = numbers[1];
    }
    setDigit(getArray(tens), getArray(ones));
}

function setDigit($tens, $ones) {
    var $digits = $(".digits").children().children();
    $.each($digits, function() {
        var opVal = 0.1;
        var tens = $tens.toString().split(",");
        var ones = $ones.toString().split(',');

        var temp = $(this).attr("id").split(/ +/);
        var tensContains = jQuery.inArray(temp[0], tens) > -1;
        var onesContains = jQuery.inArray(temp[0], ones) > -1;
        if (tensContains && temp[1] === "h1") {
            opVal = 1;
        } else if (onesContains && (temp[1] === "h2")) {
            opVal = 1;
        }
        changeOpacity(this, opVal);
    });
}

function changeOpacity(subject, val) {
    $(subject).css({opacity: val});
}

function hideAll() {
    $("span").css({opacity: 0.2});
}

function getArray(no) {
    var res;
    switch (no) {
        case '1':
            res = one;
            break;
        case '2':
            res = two;
            break;
        case '3':
            res = three;
            break;
        case '4':
            res = four;
            break;
        case '5':
            res = five;
            break;
        case '6':
            res = six;
            break;
        case '7':
            res = seven;
            break;
        case '8':
            res = eight;
            break;
        case '9':
            res = nine;
            break;
        default:
            res = zero;
            break;
    }
    return res;
}