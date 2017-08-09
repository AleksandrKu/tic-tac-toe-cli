"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GameFieldService = (function () {
    function GameFieldService() {
        this.DIMENSION = 4;
        this.counter = 0;
        /*   decrement()    {
               this.counter --;
           };*/
    }
    GameFieldService.prototype.createBoard = function () {
        var board = [];
        for (var row = 0; row < this.DIMENSION; row++) {
            board[row] = [];
            for (var col = 0; col < this.DIMENSION; col++) {
                board[row][col] = null;
            }
        }
        return board;
    };
    ;
    GameFieldService.prototype.checkBoard = function (board) {
        var _this = this;
        var winner;
        // Check rows Если в строке выигрышная комбинация, то winner присваивается 1 или 0 в зависимости , кто выиграл
        /*winner = board.reduce((hasWon, row) => hasWon || this.check(row), false);*/
        winner = board.reduce(function (hasWon, row) {
            return hasWon || _this.check(row);
        }, false); //  в качестве первого аргумента при первом вызове функции
        // Check cols
        var cols = [];
        var _loop_1 = function (i) {
            cols.push(board.map(function (row) { return row[i]; }));
        };
        for (var i = 0; i < this.DIMENSION; i++) {
            _loop_1(i);
        }
        winner = winner || cols.reduce(function (hasWon, col) { return hasWon || _this.check(col); }, false);
        // Check diagonals
        var diagonals = [
            board.map(function (row, i) { return row[i]; }),
            board.map(function (row, i) { return row[_this.DIMENSION - 1 - i]; })
        ];
        winner = winner || diagonals.reduce(function (hasWon, diagonal) { return hasWon || _this.check(diagonal); }, false);
        return winner;
    };
    GameFieldService.prototype.check = function (array) {
        /*console.log(arr);*/
        var clone = array.slice(0);
        var sum = 0;
        while (clone.length) {
            var val = clone.pop();
            if (val == null) {
                return;
            }
            sum += val;
        }
        if (sum === 0 || sum === this.DIMENSION) {
            return {
                winner: sum / this.DIMENSION || 0
            };
        }
        return;
    };
    GameFieldService.prototype.increment = function () {
        this.counter++;
    };
    ;
    GameFieldService.prototype.getValue = function () {
        return this.counter;
    };
    return GameFieldService;
}());
GameFieldService = __decorate([
    core_1.Injectable()
], GameFieldService);
exports.GameFieldService = GameFieldService;
//# sourceMappingURL=game-field.service.js.map