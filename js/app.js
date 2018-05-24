/*
 * Create a list that holds all of your cards
 */
const diamond = document.getElementsByClassName("fa-diamond");
const plane = document.getElementsByClassName("fa-paper-plane-o");
const anchor = document.getElementsByClassName("fa-anchor");
const bolt = document.getElementsByClassName("fa-bolt");
const cube = document.getElementsByClassName("fa-cube");
const leaf = document.getElementsByClassName("fa-leaf");
const bicycle = document.getElementsByClassName("fa-bicycle");
const bomb = document.getElementsByClassName("fa-bomb");
let deckStructure = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
    "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
    "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
const deck = document.getElementsByClassName('deck');
const restart = document.getElementsByClassName('restart');

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
    deckStructure = shuffle(deckStructure);
    deck[0].remove(deck[0]);
    const temp = document.createDocumentFragment();
    const newDeck = document.createElement('ul');
    for (let i = 0; i < deckStructure.length; i++) {
        const newList = document.createElement('li');
        const innerList = document.createElement('i');
        newList.className = 'card';
        innerList.className = deckStructure[i];
        newList.appendChild(innerList);
        newDeck.appendChild(newList);
    }
    newDeck.className = "deck";
    temp.appendChild(newDeck);
    const container = document.querySelector('.container');
    container.appendChild(temp);
}

let counter = 0;
let prevCard;
function flipCard(evt) {
    counter++;
    const thisCard = evt.target;
    if (thisCard.nodeName === 'LI'){
        if(!thisCard.className.includes('match')) {
            checkCard(thisCard);
        }
    }
}
let flippedCards = [];
function checkCard(evt) {
    console.log('click');
    if (evt.nodeName === 'LI'){
        if (counter < 2) {
            console.log(counter);
            evt.className = "card open show";
            flippedCards.push(evt);
            console.log(flippedCards);
        }
        if (counter === 2) {
            const prevCard = flippedCards[0];
            if (prevCard !== evt && (prevCard.querySelector('i').className === evt.querySelector('i').className)) {
                flippedCards.push(evt);
                flippedCards[0].className = "card match";
                flippedCards[1].className = "card match";
                flippedCards = [];
                counter = 0;
            }
            else if (prevCard !== evt && (prevCard.querySelector('i').className !== evt.querySelector('i').className)) {
                flippedCards.push(evt);
                flippedCards[0].className = "card show mismatch";
                flippedCards[1].className = "card show mismatch";
                setTimeout(function () {
                    flippedCards[0].className = "card"
                    flippedCards[1].className = "card"
                    flippedCards = [];
                    counter = 0;
                }, 1000);
            }
        }
    }
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
deck[0].addEventListener('click', flipCard);
restart[0].addEventListener('click', reset);