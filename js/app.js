//console.log('hello')
//konstruktory furry i coin

var Game = require('./game.js')

var button = document.querySelector('.start');
var start = button.addEventListener('click', function(){
    var starter = document.getElementById('start');
    starter.classList.add('invisible');
    
    var game = new Game();
    game.showFurry();
    game.showCoin();
    game.startGame();
    
    document.addEventListener('keydown', function(event){
        game.turnFurry(event);
    });
});