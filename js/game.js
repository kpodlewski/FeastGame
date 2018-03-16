let Pig = require('./pig.js');
let Bug = require('./bug.js');


function Game(board, pig, bug, score){
    // this.setInitialValues();
    const speedThreshold = 3;
    const initialSpeed = 250;
    const initialDirection = 'right';
    const boardSize = 10;
    
    let lastBugPosition = {
        x: 0,
        y: 0,
    }
    
    const self = this;
    this.board = document.querySelectorAll('#board > div');
    this.bug = new Bug();
    this.pig = new Pig();
    this.score = 0;
        
    this.index = function(x,y){
        return x + (y*boardSize);
    };
    
    this.showPig = function(){
        if(this.board[this.index(this.pig.x, this.pig.y)] !== undefined){
            this.board[this.index(this.pig.x, this.pig.y)].classList.add('pumba');
        };
    };
    
    this.showBug = function(){
        this.board[this.index(this.bug.x, this.bug.y)].classList.add('bug');
    };
    
    this.startGame = function(){
        self.pig.direction = initialDirection;
        this.idSetInterval = setInterval(function() {
            self.movePig();
        },initialSpeed);
    };
    
    this.speedBoost = function(){
        if(this.score % speedThreshold === 0){
            clearInterval(self.idSetInterval);
            this.idSetInterval = setInterval(function(){
                self.movePig()
            }, initialSpeed - 25 * (self.score/speedThreshold))
        }
    };
    
    
    this.movePig = function(){
        this.hideVisiblePig();
        // TODO: switch
        if(this.pig.direction === 'right'){
            this.pig.x = this.pig.x + 1;
        } else if(this.pig.direction === 'left'){
            this.pig.x = this.pig.x - 1;
        } else if(this.pig.direction === 'up'){
            this.pig.y = this.pig.y - 1;
        } else if(this.pig.direction === 'down'){
             this.pig.y = this.pig.y + 1;
        };
        self.showPig();
        self.checkBugCollision();
        self.gameOver();
    };
    
    this.hideVisiblePig = function(){
        if(document.querySelector('.pumba') !== null){
        document.querySelector('.pumba').classList.remove('pumba');
        };
    };
        
    this.hideVisibleBug = function(){
        if(document.querySelector('.bug') !== null){
        document.querySelector('.bug').classList.remove('bug');
        };
    };
        
    this.turnPig = function(event){
        switch (event.which) {
          case 37:
            this.pig.direction = "left";
            break;
          case 38:
            this.pig.direction = "up";
            break;
          case 39:
            this.pig.direction = "right";
            break;
          case 40:
            this.pig.direction = "down";
            break;
        };
    };
          
    function compareCoordinates(x1, y1, x2, y2) {
        return (x1 === x2 && y1 === y2);
    }

    this.removeBug = function() {
                    lastBugPosition.x = this.bug.x;
            lastBugPosition.y = this.bug.y;
            this.board[ this.index(this.bug.x, this.bug.y) ].classList.remove('bug');

    }
    
    this.setNewBug = function() {
                    do {
               this.bug = new Bug();
            } while(compareCoordinates(lastBugPosition.x, lastBugPosition.y, this.bug.x, this.bug.y));
            this.showBug();
    }

    this.playBugCollisionSound = function() {
                    let audio  = new Audio('./sounds/pig4.mp3');
                    audio.play();
    }

    this.increaseScore = function() {
        this.score += 1;
    }
    
    this.displayScore = function() {
        let newScore = document.querySelector('strong');
            newScore.innerText = this.score;
    }
    
    this.checkBugCollision = function(){
        if(compareCoordinates(this.pig.x, this.pig.y, this.bug.x, this.bug.y)){
            self.playBugCollisionSound();
            
            self.increaseScore();
            self.displayScore();

            self.removeBug();
            self.setNewBug();

            self.speedBoost();
        }
    };
    
    this.pigHitWall = function() {
        return (self.pig.x < 0 || self.pig.x > boardSize-1 || self.pig.y < 0 || self.pig.y > boardSize-1);
    }
    
    this.gameOver = function(){
        if(self.pigHitWall()){
            clearInterval(this.idSetInterval);
            self.hideVisiblePig();
            self.hideVisibleBug();
            self.displayGameOverScreen();
            document.addEventListener('keydown', function(event){
        self.resetGame();
    });
        }
    };

    this.removeGameOverScreen = function() {
                let over = document.querySelector('#over');
        let pumba = document.querySelector('.end');
        over.classList.add('invisible');
        pumba.classList.add('invisible');
    };
    
    this.resetScore = function() {
        self.score = 0;
    };
    
    this.resetGame = function() {
        self.removeGameOverScreen();
        self.resetScore();
        lastBugPosition.x = 0;
        lastBugPosition.y = 0;
            this.bug = new Bug();
    this.pig = new Pig();
        self.showPig();
        self.showBug();
        self.startGame();
    };
    
    this.displayGameOverScreen = function() {
        let over = document.querySelector('#over');
        let pumba = document.querySelector('.end');
        over.classList.remove('invisible');
        pumba.classList.remove('invisible');
        over.style.fontFamily = "'Press Start 2P', cursive";
        over.style.fontSize = '45px';
        over.innerText = 'You have to do better! You caught only '+self.score+ ' bugs!';
        over.style.padding = '30%';
        document.removeEventListener('keydown' , self.onKeyDown);
    }; 
};
    
module.exports = Game;