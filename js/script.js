console.log("hello");
//car variables
let suits=['Hearts','Clubs','Diamonds','Spades'],
    values=['Ace','King','Queen','Jack',
        'Ten','Nine','Eight','Seven','Six',
        'Five','Four','Three','Two'];
//dom variables
let newGameButton=document.getElementById('new-game-button'),
    hitButton=document.getElementById('hit-button'),
    stayButton=document.getElementById('stay-button');


//game variables
let gameStarted = false,
gameOver= false,
playerWon= false,
dealerCards=[],
playerCards=[],
dealerScore=0,
playerScore=0,
deck=[];


hitButton.style.display = 'none';
stayButton.style.display= 'none';
showStatus();
//functions

newGameButton.addEventListener('click',function(){
    gameStarted = true;
    gameOver= false;
    playerWon= false;

    deck=createDeck();
    suffleDeck(deck);
    dealerCards=[getNextcard(),getNextcard()];
    playerCards=[getNextcard(),getNextcard()];

    newGameButton.style.display= 'none';
    hitButton.style.display= 'inline';
    stayButton.style.display= 'inline';
    showStatus();
});

hitButton.addEventListener('click',function(){
    playerCards.push(getNextcard());
    checkForEndOfGame();
    showStatus();
});

stayButton.addEventListener('click',function(){
    gameOver= true;
    checkForEndOfGame();
    showStatus();
});

function createDeck(){
    let deck=[];
    for(let suitIdx=0;suitIdx<suits.length;suitIdx++){
        for(let valueIdx=0;valueIdx< values.length;valueIdx++){
            let card={
              suit:suits[suitIdx],
              value:values[valueIdx]  
            };
            deck.push(card);
        }
    }
    return deck;
}

function suffleDeck(deck){
    for(let i=0;i<deck.length;i++){
        let swapIdx=Math.trunc(Math.random() * deck.length);
        let tmp= deck[swapIdx];
        deck[swapIdx]=deck[i];
        deck[i]=tmp;

    }
}

function getCardString(card){
    return card.values + ' of ' + card.suit;
}

function getNextcard(){
    return deck.shift();
}

function getNumbericCardValue(card){
    switch(card.value){
        case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five': 
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
    }
}

function getScore(cardArray){
    let score=0,
    hadAce=false;

    for(let i=0;i<cardArray.length;i++){
        let card= cardArray[i];
        score +=getNumbericCardValue(card);
        if(card.value==='Ace'){
            hasAce=true;
        }
    }
    if(hasAce && score+10<=21){
        return score+10;
    }
    return score;
}

function updateScores(){
    dealerScore=getScore(dealerCards);
    playerScore=getScore(playerCards);
}