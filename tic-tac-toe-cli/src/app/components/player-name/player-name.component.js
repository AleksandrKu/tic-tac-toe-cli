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
var app_service_1 = require("../../app.service");
var PlayerName = (function () {
    function PlayerName(appService) {
        this.appService = appService;
        this.enterNames = false;
        this.start = false;
        this.winner_x = 0;
        this.winner_0 = 0;
        this.isWinnerX = false;
        this.isWinner0 = false;
    }
    ;
    PlayerName.prototype.onKeyAll = function (player1, player2) {
        if (player1 === void 0) { player1 = "Player 1"; }
        if (player2 === void 0) { player2 = "Player 2"; }
        this.player1Start = player1;
        this.player2Start = player2;
        this.start = true;
    };
    PlayerName.prototype.ngDoCheck = function () {
        this.enterNames = this.appService.getPlayers();
        console.log(" player name " + this.enterNames);
        this.winner = this.appService.getWinner();
        if (this.winner === 0) {
            this.isWinnerX = true;
        }
        if (this.winner === 1) {
            this.isWinner0 = true;
        }
        if (this.appService.restart) {
            this.isWinnerX = false;
            this.isWinner0 = false;
        }
        console.log(" this.winner " + this.winner);
        this.winner_x = this.appService.getWinnerX();
        this.winner_0 = this.appService.getWinner0();
    };
    return PlayerName;
}());
PlayerName = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'player-name',
        templateUrl: 'player-name.html',
        styleUrls: ['player-name.css']
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], PlayerName);
exports.PlayerName = PlayerName;
//# sourceMappingURL=player-name.component.js.map