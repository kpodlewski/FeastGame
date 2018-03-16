let Game = require('./game.js');

let button = document.querySelector('.start');
button.addEventListener('click', playMyGame);

function playMyGame() {
    let starter = document.getElementById('start');
    starter.classList.add('invisible');
    
    let game = new Game;
    game.showPig();
    game.showBug();
    game.startGame();
    
    document.addEventListener('keydown', function(event){
        game.turnPig(event);
    });
};