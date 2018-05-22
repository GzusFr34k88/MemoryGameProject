/*
 * Create a list that holds all of your cards
 */
let diamond = "<li class=\"card\" \n> <i class=\"fa fa-diamond\"> \n </li>";
const plane = "<li class=\"card\"> \n <i class=\"fa fa-paper-plane-o\"> \n </li>";
const anchor = "<li class=\"card\"> \n <i class=\"fa fa-anchor\"> \n </li>";
const bolt = "<li class=\"card\"> \n <i class=\"fa fa-bolt\"> \n </li>";
const cube = "<li class=\"card\"> \n <i class=\"fa fa-cube\"> \n </li>";
const leaf = "<li class=\"card\"> \n <i class=\"fa fa-leaf\"> \n </li>";
const bicycle = "<li class=\"card\"> \n <i class=\"fa fa-bicycle\"> \n </li>";
const bomb = "<li class=\"card\"> \n <i class=\"fa fa-bomb\"> \n </li>";
let deckStructure = [diamond, plane, anchor, bolt, cube, leaf, bicycle, bomb];
const deck = document.getElementsByClassName('deck');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
deckStructure = shuffle(deckStructure);

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
