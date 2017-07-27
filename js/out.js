/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Furry = __webpack_require__(3);
var Coin = __webpack_require__(2);


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
            var audio = new Audio('../sounds/pig4.wav');
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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

//console.log('hello')
//konstruktory furry i coin

var Game = __webpack_require__(0)

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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

function Coin(x, y){
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
};

module.exports = Coin;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function Furry(x, y, direction){
    this.x = 0;
    this.y = 0;
    this.direction = 'right';
};

module.exports = Furry;

/***/ })
/******/ ]);