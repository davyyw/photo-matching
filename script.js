'use strict';

const game = {
    title: 'GAME!',
    isRunning: false,
    // points: 0,
    startGameButton: document.getElementById("start-btn"),
    playerNameInput1: document.getElementById('name-input1'),
    // playerNameInput2: document.getElementById('name-input2'),
    playerNameDisplay1: document.getElementById('player1-name'),
    // playerNameDisplay2: document.getElementById('player2-name'),
    // scoreBtn1: document.getElementById("score-btn1"),
    // scoreBtn2: document.getElementById("score-btn2"),
    scoreDisplay: document.getElementById("score"),
    // scoreDisplay2: document.getElementById("score2"),
    gameScore: document.getElementById("game-states"),


    setDisabled: function () {
        this.startGameButton.style.visibility = "hidden";

        // this.startGameButton.disabled = true;
        // this.scoreBtn1.disabled = true;
        // this.scoreBtn2.disabled = true;
    },

    displayName: function () {
        document.getElementById("join-btn").addEventListener('click', function () {
            if (game.playerNameInput1.value != "") {
                game.playerNameDisplay1.innerHTML = game.playerNameInput1.value;
                player1Info.name = game.playerNameInput1.value;
                game.playerNameInput1.value = "";
                document.getElementById("name-input1").style.visibility = "hidden";
                document.getElementById("start-btn").style.visibility = "visible";
            }
            // if(game.playerNameInput2.value != ""){
            //     game.playerNameDisplay2.innerText = game.playerNameInput2.value;
            //     player2Info.name = game.playerNameInput2.value;
            //     game.playerNameInput2.value = ""; 
            //     document.getElementById("name-input2").style.visibility="hidden";
            // }
            if (game.playerNameDisplay1.innerText != '')
            // && game.playerNameDisplay2.innerText !='')
            {
                document.getElementById("start-btn").disabled = false;
                // document.getElementById("start-btn").style.visibility="hidden";
                document.getElementById("join-btn").style.visibility = "hidden";
            }
        })
    },

    startGame: function () {
        // console.log("hi");
        if (game.startGameButton.innerText == "Start Game!") {
            // console.log("hi2");
            game.startGameButton.innerText = 'Reset';
            timer.setup();
            game.changeScreen();
            gameAlgorithm.dealCards(6);

            // document.getElementById("score-btn1").disabled = false;
            // document.getElementById("score-btn2").disabled = false;
        }
        else if (game.startGameButton.innerText == "Reset") {
            // console.log("hi3");
            game.startGameButton.innerText = 'Start Game!';
            game.playerNameDisplay1.innerHTML = "";
            game.changeScreen();
            timer.reset();
            gameAlgorithm.resetGameboard();
        }

    },

    changeScreen: function () {
        if ($(".splashScreen").css("display") == "none") {
            $(".splashScreen").css("display", "block");
            $(".gameScreen").css("display", "none")
            document.getElementById("name-input1").style.visibility = "visible";
            document.getElementById("join-btn").style.visibility = "visible";
            document.getElementById("start-btn").style.visibility = "hidden";
        } else {
            $(".splashScreen").css("display", "none");
            $(".gameScreen").css("display", "block");
        }

    },

    // checkPoints1: function() {
    //     this.scoreBtn1.addEventListener('click', function() {
    //     player1Info.points += 100;
    //     game.scoreDisplay.innerText = player1Info.points;
    //     })
    // },

    // checkPoints2: function() {
    //     this.scoreBtn2.addEventListener('click', function() {
    //     player2Info.points += 100;
    //     game.scoreDisplay2.innerText = player2Info.points;
    //     })
    // }




}

const player1Info = {
    name: '',
    points: 0,
}

// const player2Info = {
//     name: '',
//     points: 0,
// }

const player = {
    name: "Player!",
    score: 0,
    startGameButton: document.getElementById("start-btn"),

    setDisabled: function () {
        this.gameOn.disabled = true;
        this.IsGameOn.disabled = true;
    },

    // startGame:function(){
    //     this.startGameButton.addEventListener('click', function() {



    //     })
    // },

    onOff: function () {
        this.gameOn.addEventListener('click', function () {
            // document.getElementById("game-states").innerText = "Yes";
        })
    }
}

game.startGameButton.addEventListener('click', function () {
    game.startGame()
})

const timer = {
    isRunning: false,
    totalTime: 40,
    timeRemaining:40,
    loopDuration: 1,
    minElement: $('#mins'),
    secElement: $('#secs'),
    progBar: $('#progress-bar'),
    btn: $('#btn'),
    intervalID: null,
    progBar: $('.progress-bar'),
    progressNumber: 100,

    counDownLoop: function () {
        if (timer.isRunning === false) {
            clearInterval(timer.intervalID);
            return;
        }

        if (timer.timeRemaining >= 0) {
            console.log(timer.timeRemaining);
            timer.updateClock2(timer.timeRemaining);
            timer.timeRemaining--;
            setTimeout(timer.counDownLoop, timer.loopDuration * 1000);
        }
        if (timer.timeRemaining == 0) {
            clearInterval(timer.intervalID);
            gameAlgorithm.timeIsUp();
            // setTimeout(timer.reset,3000);
            //document.getElementsByTagName('main')[0].style.backgroundColor = "red";
        }
    },

    setup: function () {
        timer.isRunning = !timer.isRunning;
        timer.counDownLoop();
        if (timer.isRunning) {
            timer.intervalID = setInterval(function () {
                timer.progressNumber = (timer.timeRemaining * 1000) / (timer.totalTime * 1000) * 100;
                timer.progBar.css('width', timer.progressNumber + '%');
                timer.progBar.attr('aria-valuenow', timer.progressNumber);
            }, 200);
        }
        if (timer.isRunning) {
            $('#btn').text('PAUSE')
        } else {
            $('#btn').text('PLAY')
        }

    },

    reset: function () {
        // document.getElementsByTagName('main')[0].style.backgroundColor = "blue";
        document.getElementById('mins').innerHTML = '01';
        document.getElementById('secs').innerHTML = '30';
        timer.progBar.css('width', '100%');
        // document.getElementById('btn').innerHTML = 'START';
        timer.isRunning = false;
        timer.timeRemaining = timer.totalTime;
        timer.progressNumber = 100;
    },

    checkTime: function (i) {
        if (i < 10) {
            i = '0' + i;
        }
        return i
    },

    updateClock2: function (numberOfSeconds) {
        let minutes = Math.floor(numberOfSeconds / 60);
        let seconds = numberOfSeconds - (minutes * 60);
        minutes = timer.checkTime(minutes);
        seconds = timer.checkTime(seconds);

        document.getElementById("mins").innerHTML = minutes;
        document.getElementById("secs").innerHTML = seconds;
    }
}


const gameAlgorithm = {
    preventClicks: false,
    possibleCards: ['images/img1.png', 'images/img2.png', 'images/img3.png', 'images/img4.png', 'images/img5.png', 'images/img6.svg'],
    drawnCards: [],
    cardPairs: [],
    shuffledPairs: [],

    dealCards: function (numPairs = 1) {
        this.resetGameboard();
        this.resetCards();
        this.drawCards(numPairs);
        this.makePairs();
        this.shuffleCards();
        this.renderCards();
        this.activateCards();
    },

    resetGameboard: function () {
        $('.gameScreen').html('');
        this.preventClicks = false;
    },

    /* reset the card Arrays to empty  */
    resetCards: function () {
        this.drawnCards = [];
        this.cardPairs = [];
        this.shuffledPairs = [];
    },

    /* populate the cardset array with unique elements from possible cards */
    drawCards: function (numCards = 1) {
        /* Before we enter the loop, check that a valid number of cards has been requested */
        if (numCards > this.possibleCards.length) {
            console.log('asking for more cards than exist');
            return;
        }

        // loop until the drawnCards array is filled with the specified number of cards 
        while (this.drawnCards.length < numCards) {
            const randomIndex = Math.floor(Math.random() * this.possibleCards.length);
            /* check if the drawn card is already in the card set */
            if (this.drawnCards.indexOf(this.possibleCards[randomIndex]) >= 0) {
                continue;
            } else {
                this.drawnCards.push(this.possibleCards[randomIndex]);
            }
        }
        console.log('unique, individual, cards', this.drawnCards);
    },

    /* concatenate drawnCards with itself so we have pairs of each drawn card */
    makePairs: function () {
        this.cardPairs = this.drawnCards.concat(this.drawnCards);
        console.log(this.cardPairs);
    },

    /* randomly pull from the ordered cardPairs Array and insert into shuffledCards */
    shuffleCards: function () {
        while (this.cardPairs.length > 0) {
            const randomIndex = Math.floor(Math.random() * this.cardPairs.length);
            const randomCard = this.cardPairs.splice(randomIndex, 1);
            this.shuffledPairs.push(randomCard[0]);
        }
        console.log(this.shuffledPairs);
    },


    renderCards: function () {
        // loop through the array of shuffledPairs
        for (const item of this.shuffledPairs) {
            console.log(item);
            const cardDomString = `<div class="card">
          <img class = "faceUp" src="${item}" alt="">
          <div class="faceDown"></div>
        </div>`;
            // use jquery to insert into the DOM
            $('.gameScreen').append(cardDomString);
        }
    },

    activateCards: function () {
        $('.card').on('click', function (event) {
            /* prevent clicking on more than 2 cards while waiting for match detection and possibly turn-down on unmatched  */
            if (!gameAlgorithm.preventClicks) {
                /* The click actually happens on the inner (face down) div, but since we registered the event listener on the outer .card element use event.currentTarget */
                console.log(event.currentTarget);
                $(event.currentTarget).addClass('selected').children('.faceDown').slideUp();
                /* if there are two cards now selected, prevent clicks and check for match */
                if ($('.card.selected').length == 2) {
                    console.log('check for match');
                    gameAlgorithm.preventClicks = true;
                    gameAlgorithm.checkForMatch();
                }
            }
        });
    },

    /* called when 2 cards have been selected */
    checkForMatch: function () {
        /* extract the innerHTML of the 2 cards so that we can compare them */
        const card1 = $('.card.selected').eq(0).children('.faceUp').attr("src");
        const card2 = $('.card.selected').eq(1).children('.faceUp').attr("src");
        if (card1 == card2) {
            console.log('MATCH!');
            // cards stay face up but remove the selected class
            $('.card.selected').removeClass('selected');
            // allow user to start clicking in serach of another matching pair
            this.preventClicks = false;
        } else {
            console.log('nope');
            // no match, so turn them back to face down and unselected after 2 seconds
            setTimeout(gameAlgorithm.deselectCards, 2000);
        }
    },

    /* called when there is no match.  unselect the currently selected 2 cards and turn them back to face down  */
    deselectCards: function () {
        $('.card.selected').removeClass('selected').children('.faceDown').slideDown();
        // allow user to click on cards to try again
        gameAlgorithm.preventClicks = false;

    },

    timeIsUp: function(){
        this.preventClicks = true;
        alert("Time is up and game is over!");
    },
}



game.displayName();
game.setDisabled();
game.checkPoints1();
game.checkPoints2();

player.setDisabled();
player.startGame();
player.onOff();



