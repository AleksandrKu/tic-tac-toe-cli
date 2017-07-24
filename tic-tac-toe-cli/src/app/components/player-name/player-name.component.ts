import {Component, DoCheck} from '@angular/core';
import {AppService} from '../../app.service';

@Component({
    moduleId: module.id,
    selector: 'player-name',
    templateUrl: 'player-name.html',
    styleUrls: ['player-name.css']
})
export class PlayerName implements DoCheck {
    constructor(private appService: AppService) {
    };
    public enterNames: any = false;
    public start: boolean = false;
    private player1: string;
    private player2: string;
    public winner: number;
    private winner_x: number = 0;
    private winner_0: number = 0;
    private isWinnerX: boolean = false;
    private isWinner0: boolean = false;
    private numberGame: number = 0;

    onKeyAll(player1Enter: string = "Player 1", player2Enter: string = "Player 2") {
        this.player1 = player1Enter;
        this.player2 = player2Enter;
        this.start = true;
        this.appService.setPlayersName(this.player1, this.player2);
    }

    ngDoCheck() {
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

        this.numberGame = this.appService.getNumberGame();
    }

}
