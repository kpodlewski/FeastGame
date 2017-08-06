//console.log('hello')
//konstruktory furry i coin

var Game = require('./game.js')

var button = document.querySelector('.start');
button.addEventListener('click' || 'keydown', playMyGame);

function playMyGame() {
    var starter = document.getElementById('start');
    starter.classList.add('invisible');
    
    var game = new Game();
    game.showFurry();
    game.showCoin();
    game.startGame();
    
    document.addEventListener('keydown', function(event){
        game.turnFurry(event);

    });
}