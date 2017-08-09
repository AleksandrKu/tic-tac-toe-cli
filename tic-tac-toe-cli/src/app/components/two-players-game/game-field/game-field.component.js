"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var game_field_service_1 = require("./game-field.service");
var app_service_1 = require("../../../app.service");
var GameField = (function () {
    /* items: FirebaseListObservable<any[]>;*/
    function GameField(gameFieldService, appService) {
        this.gameFieldService = gameFieldService;
        this.appService = appService;
        this.rowClassBoard = "row-4";
        this.cellClassBoard = "cell-4";
        this.counterGames = 0; // количество игр
        this.tile = "0";
        this.board = this.gameFieldService.createBoard(); // для поля
        this.currentPlayer = 0;
        /* this.items = af.list('/messages');*/
    }
    // Start code fo firebase ****************************************
    GameField.prototype.newGame = function () {
        /* reload();*/
    };
    /*  logout() {
          this.afAuth.auth.signOut();
      }
  
      Send(desc: string) {
  
      }*/
    // End code fo firebase  ******************************************
    GameField.prototype.cellClicked = function (row, col) {
        if (this.board[row][col] === 0 || this.board[row][col] === 1 || this.winner != null)
            return;
        this.currentPlayer++;
        this.board[row][col] = this.currentPlayer % 2 ? 0 : 1;
        var checkResult = this.gameFieldService.checkBoard(this.board);
        if (checkResult) {
            this.winner = checkResult.winner;
            this.appService.setWinner(this.winner);
        }
    };
    GameField.prototype.restart2 = function () {
        this.board = this.gameFieldService.createBoard();
        this.winner = null;
        this.currentPlayer = 0;
        this.appService.setRestartGame();
    };
    return GameField;
}());
GameField = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'game-field',
        templateUrl: 'src/app/components/two-players-game/game-field/game-field.html',
        styleUrls: ['./game-field.scss'],
        providers: [game_field_service_1.GameFieldService]
    }),
    __metadata("design:paramtypes", [game_field_service_1.GameFieldService,
        app_service_1.AppService])
], GameField);
exports.GameField = GameField;
//# sourceMappingURL=game-field.component.js.map