var Furry = require('./furry.js');
var Coin = require('./coin.js');


function Game(board, furry, coin, score){
    
    var self = this;
    this.board = document.querySelectorAll('#board > div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    
    this.index = function(x,y){
        return x + (y * 10);
    }; //obliczanie pozycji na planszy
    
    this.showFurry = function(){
        if(this.board[ this.index(this.furry.x, this.furry.y) ]!== undefined){
            this.board[ this.index(this.furry.x, this.furry.y) ].classList.add('furry');
        };
    };
    
    this.showCoin = function(){
        this.board[ this.index(this.coin.x, this.coin.y) ].classList.add('coin');
    };
    
    this.startGame = function(){
        this.idSetInterval = setInterval(function(){
            self.moveFurry()
        }, 250);
    };

    this.speedBoost = function(){
        
        if(self.score === 3){
            clearInterval(self.idSetInterval);
            this.idSetInterval = setInterval(function(){
                self.moveFurry()
            }, 200);
        } else if(self.score === 6){
            clearInterval(self.idSetInterval);
            this.idSetInterval = setInterval(function(){
                self.moveFurry()
            }, 150);
        } else if(self.score === 9){
            clearInterval(self.idSetInterval);
            this.idSetInterval = setInterval(function(){
                self.moveFurry()
            }, 100);
        } else if(self.score === 12){
            clearInterval(self.idSetInterval);
            this.idSetInterval = setInterval(function(){
                self.moveFurry()
            }, 50);
         }
    };
    
    this.moveFurry = function(){
        this.hideVisibleFurry();
        if(this.furry.direction === 'right'){
            this.furry.x = this.furry.x + 1;;
        } else if(this.furry.direction === 'left'){
            this.furry.x = this.furry.x - 1;
        } else if(this.furry.direction === 'up'){
            this.furry.y = this.furry.y - 1;
        } else if(this.furry.direction === 'down'){
            this.furry.y = this.furry.y + 1;
        };
        self.showFurry();
        self.checkCoinCollision();
        self.gameOver();
        self.speedBoost();
    };
    
    this.hideVisibleFurry = function(){
        if(document.querySelector('.furry') !== null){
        document.querySelector('.furry').classList.remove('furry');
        };
    };
    this.hideVisibleCoin = function(){
        if(document.querySelector('.coin') !== null){
        document.querySelector('.coin').classList.remove('coin');
        };
    };
    
    this.turnFurry = function(event){
        switch (event.which) {
          case 37:
            this.furry.direction = "left";
            break;
          case 38:
            this.furry.direction = "up";
            break;
          case 39:
            this.furry.direction = "right";
            break;
          case 40:
            this.furry.direction = "down";
            break;
        };
    };
    
    this.checkCoinCollision = function(){
        if(this.furry.x === this.coin.x && this.furry.y === this.coin.y){
            this.board[ this.index(this.coin.x, this.coin.y) ].classList.remove('coin');
            this.score = this.score + 1;
            var newScore = document.querySelector('strong')
            newScore.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
            var audio = new Audio('../sounds/pig4.mp3');
            audio.play();
           
        }
    };
    
    this.gameOver = function(){
        if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9){
            clearInterval(this.idSetInterval);
            self.hideVisibleFurry();
            self.hideVisibleCoin();
            var over = document.querySelector('#over');
            var pumba = document.querySelector('.end');
            over.classList.remove('invisible');
            pumba.classList.remove('invisible');
            over.style.fontFamily = "'Press Start 2P', cursive";
            over.style.fontSize = '45px';
            over.innerText = 'You have to do better! You caught only '+self.score+ ' bugs!';
            over.style.padding = '20%';
        } 
    }

};

module.exports = Game;