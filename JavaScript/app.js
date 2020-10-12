let card1 = '';
let card2 = '';
let card1Parent = '';
let card2Parent = '';
let ready = true;
let stopTimer = false;
let cardCounter = 0;

document.querySelector(".restart").addEventListener("click", restart);
document.querySelector(".restart").addEventListener("click", flash_cards);

document.querySelector(".deck").addEventListener("click", function() {stopTimer = false; timerStart()});

document.querySelector(".deck").addEventListener("click", cardOpen);

document.querySelector(".playAgain").addEventListener("click", function() {
  document.querySelector(".winPage").className = "winPage closed"; restart(), flash_cards()});

document.querySelector(".info").addEventListener("click", showInfo);

//Every time which open index.html cards will have different place. 
  restart();
  flash_cards();

// Unlocking clicked cards and comparing them

function cardOpen(evt) {
  if (evt.target.className == "card" && cardCounter != 2) {
      evt.target.className += " open show";

    // Determines which card comes first in a unlocked pair of cards

    if (card1 == false) {
      card1 = evt.target.firstElementChild.className;
      card1Parent = evt.target;
      cardCounter = 1;
    } else {

      // Increasing the amount of moves

      document.querySelector(".moves").innerText = +document.querySelector(".moves").innerText + 1;
      // Rating system. Stars decrease depending on how many moves you've made

      if (document.querySelector(".moves").innerText == '9' || 
      	 document.querySelector(".moves").innerText == '16' || 
      	 document.querySelector(".moves").innerText == '24') 
      {
         document.querySelector(".fa-star").parentNode.removeChild(document.querySelector(".fa-star"));
    //}else if(document.querySelector(".moves").innerText == '25'){
    //  lose();
    }

      card2 = evt.target.firstElementChild.className;
      card2Parent = evt.target;
      cardCounter = 2;

      // Card matching

      if (card1 == card2) {
        card1Parent.className = "card open show match";
        card2Parent.className = "card open show match";
        card1 = '';
        card2 = '';
        cardCounter = 0;
        win();
      } else {
        setTimeout(function () {
          evt.target.className = "card close"; card1Parent.className = "card close"}, 500);
        setTimeout(function () {
          evt.target.className = "card"; card1Parent.className = "card";card1 = ''; card2 = ''; cardCounter = 0}, 700);
      }

    ready = false;

    }
  }
}

function flash_cards() {
    document.querySelectorAll('.card').forEach(function(cards) {
      cards.classList.add('open', 'show');
    });
    setTimeout(function(){
      document.querySelectorAll('.card').forEach(function(cards) {
        cards.classList.remove('open', 'show');
      });
    }, 3000);
  }

function showInfo() {
    alert('	~Time Stopped~ \n\n\
    Grading System: \n\
    0-8 Moves = 3 Stars! \n\
    9-15 Moves = 2 Stars! \n\
    16-23 Moves = 1 Star! \n\
    24+ Moves = 0 Stars! \n\
    ');
  }

// Rating system renewal
function returnStars() {
  while (document.getElementsByClassName("fa-star").length != 3) {
    var newStar = document.createElement("li");
    newStar.className = "fa fa-star";
    document.querySelector(".stars").appendChild(newStar);
  }
}

//Resets all the progress you've made when you finish the game

function restart() {
  card1 = "";
  card2 = "";
  document.querySelector(".moves").innerText = "0";
  returnStars();
  document.querySelector(".winPage").className = "winPage closed";


  let cards = Array.prototype.slice.call(document.querySelectorAll('.card'));
  cards = shuffle(cards);
  const deck = document.querySelector(".deck");

  for (let i = 0; i < cards.length; i++) {
    deck.appendChild(cards[i]);
    cards[i].className = "card";
  }

  ready = true;
 
  stopTimer = true;
 
 }


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

// Timer

function timerStart() {
  if (ready == true) {
    var timer = 0;
    var hour = 0;
    var minute = 0;
    var second = 0;
    window.setInterval (function() {
      ++timer;
      hour = Math.floor(timer / 3600);
      minute = Math.floor((timer - hour * 3600) / 60);
      second = timer - hour * 3600 - minute * 60;
      if (hour < 10) hour = '0' + hour;
      if (minute < 10) minute = '0' + minute;
      if (second < 10) second = '0' + second;
      document.querySelector('#timer').innerHTML = hour + ':' + minute + ':' + second;
      if(stopTimer) {
      document.querySelector('#timer').innerHTML = "00:00:00";
      timer = 0;
      hour = 0;
      minute = 0;
      second = 0;
      return;
      }
    }, 1000);
  }
}

// Shows a modal box when you win:
function win() {
 document.querySelector(".movesCount").innerText = document.querySelector(".moves").innerText;
 document.querySelector(".starsCount").innerText = document.getElementsByClassName("fa-star").length;
 document.querySelector(".finalTime").innerText = document.querySelector('#timer').innerHTML;

 //Collect cards to check if all are open and match:

 let matchingCards = document.getElementsByClassName('card match open show');
 if (matchingCards.length == 16) {
   setTimeout (function() {document.querySelector(".winPage").className = "winPage"}, 500);
   stopTimer = true;
 }
}
