import {Component, DoCheck} from '@angular/core';
import {AppService} from '../../../app.service';

@Component({
    moduleId: module.id,
    selector: 'player-name',
    templateUrl: './player-name.html',
    styleUrls: ['./player-name.css']
})
export class PlayerNameComponent implements DoCheck {
    constructor(private appService: AppService) {
    };
    public enterNames: boolean = false;
    public enterOnePlayer: boolean = false;

    public start: boolean = false;
    public player1: string;
    public player2: string;
    public player: string;

    public winner: number;
    private winner_x: number = 0;
    private winner_0: number = 0;
    private isWinnerX: boolean = false;
    private isWinner0: boolean = false;
    private numberGame: number = 0;

    enterTwoName(player1Enter: string = "Player 1", player2Enter: string = "Player 2") {
        this.player1 = player1Enter;
        this.player2 = player2Enter;
        this.start = true;
        this.appService.setPlayersName(this.player1, this.player2);
    }

    enterOneName(playerEnter: string = "Anonymous") {
        this.player = playerEnter;
        this.start = true;
        this.appService.setOnePlayerName(this.player);
    }



    ngDoCheck() {
        this.enterNames = this.appService.getPlayers();
        this.enterOnePlayer = this.appService.getOnePlayer();

        /*console.log(" player name " + this.enterNames);*/
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
       /* console.log(" this.winner " + this.winner);*/
        this.winner_x = this.appService.getWinnerX();
        this.winner_0 = this.appService.getWinner0();

        this.numberGame = this.appService.getNumberGame();
    }

}
