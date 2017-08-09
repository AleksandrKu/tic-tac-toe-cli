import {Component, DoCheck} from '@angular/core';
import {GameFieldService} from './game-field.service';
import {AppService} from '../../../app.service';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
/*import {Observable} from 'rxjs/Observable';
import {DatePipe} from '@angular/common';*/

@Component({
    moduleId: module.id,
    selector: 'game-field',
    templateUrl: './game-field.html',
    styleUrls: ['./game-field.scss'],
    providers: [GameFieldService]
})
export class GameFieldComponent implements DoCheck {
    private sizeField: number = 3;
    private rowClassBoard: String = "row-3";
    private cellClassBoard: String = "cell-3";
    private marker: string = "marker-3";

    private counterGames: number = 0; // количество игр
    private tile: string = "0";
    public currentPlayer: number = 0;
    private winner: number;
    private player1: string;
    private player2: string;

    public board = this.gameFieldService.createBoard(this.sizeField); // для поля

    private players: string;
    public showHistory: boolean = false;
    private date: any;
    constructor(private gameFieldService: GameFieldService,
                private appService: AppService,
                private db: AngularFireDatabase) {
        //*******************************************
        this.appService.caseNumber$.subscribe(
            size => {
                this.sizeField = size;
                /* this.searchCaseNumber = data;*/
                /*   this.sibling2Form.patchValue({
                 caseNumber: data
                 });*/

                // перерисовываем поле с новыми значениями
                this.board = this.gameFieldService.createBoard(this.sizeField);
                this.winner = null;
                this.currentPlayer = 0;
                this.appService.setRestartGame();

                this.rowClassBoard = "row-" + size;
                this.cellClassBoard = "cell-" + size;
                this.marker = "marker-" + size;

            });
        //******************************************
    }

    newGame() {
        this.player1 = this.appService.getPlayersName()[0];
        this.player2 = this.appService.getPlayersName()[1];
        //запись в firebase
        /*const itemObservable = this.db.object('/game'); // имя документа
         itemObservable.update({
         numberGames: this.appService.getNumberGame(),
         player1: this.player1,
         player1Points: this.appService.getWinnerX(),
         player2: this.player2,
         player2Points: this.appService.getWinner0(),
         date: this.gameFieldService.getRealTime()
         });*/
        const items = this.db.list('/games');
        items.push({
            numberGames: this.appService.getNumberGame(),
            player1: this.player1,
            player1Points: this.appService.getWinnerX(),
            player2: this.player2,
            player2Points: this.appService.getWinner0(),
            date: this.gameFieldService.getRealTime()
        });
        window.location.reload();
    }

    cellClicked(row: number, col: number) {
        if (this.board[row][col] === 0 || this.board[row][col] === 1 || this.winner != null)
            return;
        this.currentPlayer++;
        this.board[row][col] = this.currentPlayer % 2 ? 0 : 1;
        let checkResult = this.gameFieldService.checkBoard(this.board);

        if (checkResult) {
            this.winner = checkResult.winner;
            this.appService.setWinner(this.winner);

        }
    }

    restartGame() {
        this.board = this.gameFieldService.createBoard(this.sizeField);
        this.winner = null;
        this.currentPlayer = 0;
        this.appService.setRestartGame();
        this.appService.setNumberGame();
    }

    ngDoCheck() {
        this.showHistory = this.appService.getShowHistory();
    }
}