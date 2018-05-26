/*
 * Create a list that holds all of your cards
 */
let deckStructure = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
    "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
    "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
const deck = document.querySelector('.deck');
const restart = document.querySelector('.restart');
const stars = document.querySelector('.fa-stars');
const moves = document.querySelector('.moves');
const scoreEl = document.querySelector('.score');
let score = 10000;
let counter = 0;
let flippedCards = [];
let scoreActive = false;
let matchedCounter = 0;
let currentStars = 3;
let moveCounter = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

reset();
function reset() {
    counter = 0;
    moveCounter = 0;
    moves.textContent = 0;
    scoreEl.textContent = 10000;
    score = 10000;
    scoreActive = false;
    matchedCounter = 0;
    currentStars = 3;
    document.querySelector('#star-3').className = 'fa fa-star';
    document.querySelector('#star-2').className = 'fa fa-star';
    flippedCards = [];
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }
    deckStructure = shuffle(deckStructure);
    const temp = document.createDocumentFragment();
    for (let i = 0; i < deckStructure.length; i++) {
        const newList = document.createElement('li');
        const innerList = document.createElement('i');
        newList.className = 'card';
        innerList.className = deckStructure[i];
        newList.appendChild(innerList);
        temp.appendChild(newList);
    }
    deck.appendChild(temp);
}

function flipCard(evt) {
    const thisCard = evt.target;
    if (thisCard.nodeName === 'LI'){
            if (!scoreActive) {
                scoreActive = true;
                scoringSystem();
            }
        counter++;
        if(!thisCard.className.includes('match')) {
            checkCard(thisCard);
        }
    }
}

function checkCard(evt) {
    if (evt.nodeName === 'LI'){
        if (counter < 2) {
            evt.className = "card open show";
            flippedCards.push(evt);
        }
        if (counter === 2) {
            const prevCard = flippedCards[0];
            if (prevCard !== evt && (prevCard.querySelector('i').className === evt.querySelector('i').className)) {
                moveNumbers();
                stats();
                flippedCards.push(evt);
                flippedCards[0].className = "card match";
                flippedCards[1].className = "card match";
                flippedCards = [];
                counter = 0;
                matchedCounter++;
            }
            else if (prevCard !== evt && (prevCard.querySelector('i').className !== evt.querySelector('i').className)) {
                flippedCards.push(evt);
                moveNumbers();
                stats();
                flippedCards[0].className = "card show mismatch";
                flippedCards[1].className = "card show mismatch";
                setTimeout(function () {
                    flippedCards[0].className = "card"
                    flippedCards[1].className = "card"
                    flippedCards = [];
                    counter = 0;
                }, 800);
            }
        }
    }
}
function moveNumbers() {
    moveCounter++;
    moves.textContent = moveCounter;
}

function stats() {
    if (moveCounter === 10) {
        document.querySelector('#star-3').className = "fa fa-star-o";
        currentStars --;
    }
    if (moveCounter === 15) {
        document.querySelector('#star-2').className = "fa fa-star-o";
        currentStars--;
    }
}

function scoringSystem() {
    var startScoring = setInterval(function() {
        if (score > 0 && scoreActive) {
            score -= 50;
        }
        scoreEl.textContent = score;
        if (!scoreActive) {
            clearInterval(startScoring);
        }
        if (matchedCounter === 8) {
            clearInterval(startScoring);
            if(currentStars > 1) {
                if (window.confirm("You won with " + moveCounter + " moves! You got " + currentStars + " stars and scored " + score + " points! Press Ok if you want to play again.")) {
                    reset();
                }
            }
            else {
                if (window.confirm("You won with " + moveCounter + " moves! You got " + currentStars + " star and scored " + score + " points! Press Ok if you want to play again.")){
                    reset();
                }
            }
        }
    }, 1000)
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
deck.addEventListener('click', flipCard, false);
restart.addEventListener('click', reset, false);