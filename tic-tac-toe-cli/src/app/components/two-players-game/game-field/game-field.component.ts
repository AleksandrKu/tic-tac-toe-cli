import {Component, DoCheck} from '@angular/core';
import {GameFieldService} from './game-field.service';
import {ComputerPlayerService} from './computer-player.service';
import {AppService} from '../../../app.service';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
/*import {Observable} from 'rxjs/Observable';
import {DatePipe} from '@angular/common';*/

@Component({
    moduleId: module.id,
    selector: 'game-field',
    templateUrl: './game-field.html',
    styleUrls: ['./game-field.scss'],
    providers: [GameFieldService, ComputerPlayerService]
})
export class GameFieldComponent implements DoCheck {
    private sizeField: number = 3;
    private rowClassBoard: String = "row-3";
    private cellClassBoard: String = "cell-3";
    private marker: string = "marker-3";

   /* private counterGames: number = 0; // количество игр
    private tile: string = "0";*/
    public currentPlayer: number = 0;
    private winner: number;
    private player1: string;
    private player2: string;
    private player: string;

    public board = this.gameFieldService.createBoard(this.sizeField); // для поля

   /* private players: string;*/
    public showHistory: boolean = false;
  /*  private date: any;*/
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
if(!this.player1) {
        this.player1 = this.appService.getOnePlayerName();
        this.player2 = "Computer" ;
}
        if(this.player1) {
        const items = this.db.list('/games');
        items.push({
            numberGames: this.appService.getNumberGame(),
            player1: this.player1,
            player1Points: this.appService.getWinnerX(),
            player2: this.player2,
            player2Points: this.appService.getWinner0(),
            date: this.gameFieldService.getRealTime()
        });
        }
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

    computerGameEmptyFieldClick() {
        for (let i = 0; i < this.sizeField; i++) {
            for (let j = 0; j < this.sizeField; j++) {
                if ((this.board[i][j] === 0) || (this.board[i][j] === 1 || this.winner != null)) {
                } else {
                    this.board[i][j] = 1;
                    console.log(i + ' ' + j);
                    return;
                }
            }
        }
    }


    computerGameEmptyCheck(rowNew: number, colNew: number) {
         if ((this.board[rowNew][colNew] === 0) || (this.board[rowNew][colNew] === 1 || this.winner != null)) {
            return false;
        } else {
            this.board[rowNew][colNew] = 1;
            console.log(rowNew + ' ' + colNew);
            return true;
        }
    }

    computerGameEmptyFieldClickNearX(row: number, col: number) {
        let rowRandom = Math.floor(Math.random() * (this.sizeField));
        let colRandom = Math.floor(Math.random() * (this.sizeField));
        console.log(rowRandom + ' ' + colRandom);

        if((this.board[rowRandom][colRandom] === 0) || (this.board[rowRandom][colRandom] === 1)) {

            this.computerGameEmptyCheck(Math.floor(Math.random() * (this.sizeField)), Math.floor(Math.random() * (this.sizeField)))




        } else {
            this.computerGameEmptyCheck(rowRandom, colRandom);
console.log('while');
           /* rowRandom = Math.floor(Math.random() * (this.sizeField - 1));
            colRandom = Math.floor(Math.random() * (this.sizeField - 1));*/

        }
    }

    computerGame(row: number, col: number) {
        if(this.sizeField === 3) {

            switch (this.currentPlayer) {
                case 1 :
                    if       (this.board[1][1] === 0) { this.board[0][0] = 1; }
                    else if  (this.board[0][0] === 0) { this.board[1][1] = 1; }
                    else if  (this.board[2][0] === 0) { this.board[0][2] = 1; }
                    else if  (this.board[1][1] === null) { this.board[1][1] = 1; }

                    else { this.computerGameEmptyFieldClick(); }
                    break;
                case 3 :
                    if ((this.board[0][0] === 0) && (this.board[2][2] === 0)) {
                        this.board[1][0] = 1;
                    } else if((this.board[0][0] === 0) && (this.board[2][0] === 0)) {
                        this.board[1][0] = 1;
                    } else if((this.board[0][2] === 0) && (this.board[2][2] === 0)) {
                        this.board[1][2] = 1;
                    } else if((this.board[2][0] === 0) && (this.board[2][2] === 0)) {
                        this.board[2][1] = 1;
                    } else if((this.board[1][1] === 0) && (this.board[2][2] === 0)) {
                        this.board[0][2] = 1; }

                        else if   ((this.board[0][0] === 0) && (this.board[0][2] === 0) && (this.board[0][1] == null)) { this.board[0][1] = 1; }
                        else if   ((this.board[0][0] === 0) && (this.board[0][2] === null) && (this.board[0][1] == 0)) { this.board[0][2] = 1; }
                        else if   ((this.board[0][0] === null) && (this.board[0][2] === 0) && (this.board[0][1] == 0)) { this.board[0][0] = 1; }

                        else if   ((this.board[1][0] === 0) && (this.board[1][2] === 0) && (this.board[1][1] == null)) { this.board[1][1] = 1; }
                        else if   ((this.board[1][0] === 0) && (this.board[1][2] == null) && (this.board[1][1] == 0)) { this.board[1][2] = 1; }
                        else if   ((this.board[1][0] == null) && (this.board[1][2] === 0) && (this.board[1][1] == 0)) { this.board[1][0] = 1; }

                        else if   ((this.board[0][0] == 0) && (this.board[1][0] === 0) && (this.board[2][0] == null)) { this.board[2][0] = 1; }

                        else if   ((this.board[0][2] == 0) && (this.board[1][1] === 0) && (this.board[2][0] == null)) { this.board[2][0] = 1; }
                    else  {
                        this.computerGameEmptyFieldClick();
                    }
                    break;

                default:
                    if        ((this.board[0][0] === 1) && (this.board[0][1] === 1) && (this.board[0][2] == null)) { this.board[0][2] = 1; }
                    else if   ((this.board[1][0] === 1) && (this.board[1][1] === 1) && (this.board[1][2] == null)) { this.board[1][2] = 1; }
                    else if   ((this.board[2][0] === 1) && (this.board[2][1] === 1) && (this.board[2][2] == null)) { this.board[2][2] = 1; }

                    else if   ((this.board[0][0] === 1) && (this.board[0][1] === null) && (this.board[0][2] == 1)) { this.board[0][1] = 1; }
                    else if   ((this.board[1][0] === 1) && (this.board[1][1] === null) && (this.board[1][2] == 1)) { this.board[1][1] = 1; }
                    else if   ((this.board[2][0] === 1) && (this.board[2][1] === null) && (this.board[2][2] == 1)) { this.board[2][1] = 1; }

                    else if   ((this.board[0][0] === null) && (this.board[0][1] === 1) && (this.board[0][2] == 1)) { this.board[0][0] = 1; }
                    else if   ((this.board[1][0] === null) && (this.board[1][1] === 1) && (this.board[1][2] == 1)) { this.board[1][0] = 1; }
                    else if   ((this.board[2][0] === null) && (this.board[2][1] === 1) && (this.board[2][2] == 1)) { this.board[2][0] = 1; }


                    else if   ((this.board[0][0] === 1) && (this.board[1][0] === 1) && (this.board[2][0] == null)) { this.board[2][0] = 1; }
                    else if   ((this.board[0][1] === 1) && (this.board[1][1] === 1) && (this.board[2][1] == null)) { this.board[2][1] = 1; }
                    else if   ((this.board[0][2] === 1) && (this.board[1][2] === 1) && (this.board[2][2] == null)) { this.board[2][2] = 1; }

                    else if   ((this.board[0][0] === 1) && (this.board[1][0] === null) && (this.board[2][0] == 1)) { this.board[1][0] = 1; }
                    else if   ((this.board[0][1] === 1) && (this.board[1][1] === null) && (this.board[2][1] == 1)) { this.board[1][1] = 1; }
                    else if   ((this.board[0][2] === 1) && (this.board[1][2] === null) && (this.board[2][2] == 1)) { this.board[1][2] = 1; }

                    else if   ((this.board[0][0] === null) && (this.board[1][0] === 1) && (this.board[2][0] == 1)) { this.board[0][0] = 1; }
                    else if   ((this.board[0][1] === null) && (this.board[1][1] === 1) && (this.board[2][1] == 1)) { this.board[0][1] = 1; }
                    else if   ((this.board[0][2] === null) && (this.board[1][2] === 1) && (this.board[2][2] == 1)) { this.board[0][2] = 1; }


                    else if   ((this.board[0][0] === 1) && (this.board[1][1] === 1) && (this.board[2][2] == null)) { this.board[2][2] = 1; }
                    else if   ((this.board[0][2] === 1) && (this.board[1][1] === 1) && (this.board[2][0] == null)) { this.board[2][0] = 1; }

                    else if   ((this.board[0][0] === 1) && (this.board[1][1] === null) && (this.board[2][2] == 1)) { this.board[1][1] = 1; }
                    else if   ((this.board[0][2] === 1) && (this.board[1][1] === null) && (this.board[2][0] == 1)) { this.board[1][1] = 1; }

                    else if   ((this.board[0][0] === null) && (this.board[1][1] === 1) && (this.board[2][2] == 1)) { this.board[0][0] = 1; }
                    else if   ((this.board[0][2] === null) && (this.board[1][1] === 1) && (this.board[2][0] == 1)) { this.board[0][2] = 1; }


                    else if   ((this.board[0][0] === 0) && (this.board[0][2] === 0) && (this.board[0][1] == null)) { this.board[0][1] = 1; }
                    else if   ((this.board[0][0] === 0) && (this.board[0][2] === null) && (this.board[0][1] == 0)) { this.board[0][2] = 1; }
                    else if   ((this.board[0][0] === null) && (this.board[0][2] === 0) && (this.board[0][1] == 0)) { this.board[0][0] = 1; }

                    else if   ((this.board[1][0] === 0) && (this.board[1][2] === 0) && (this.board[1][1] == null)) { this.board[1][1] = 1; }
                    else if   ((this.board[1][0] === 0) && (this.board[1][2] == null) && (this.board[1][1] == 0)) { this.board[1][2] = 1; }
                    else if   ((this.board[1][0] == null) && (this.board[1][2] === 0) && (this.board[1][1] == 0)) { this.board[1][0] = 1; }




                    else {
                    this.computerGameEmptyFieldClick();

            }


            }
            this.currentPlayer++;

        } else {
            this.currentPlayer++;
            this.computerGameEmptyFieldClickNearX(row,col);


    }

        let checkResult = this.gameFieldService.checkBoard(this.board);

        if (checkResult) {
            this.winner = checkResult.winner;
            this.appService.setWinner(this.winner);
        }

     return;
    }


    cellClickedWithComputer(row: number, col: number) {
        if (this.board[row][col] === 0 || this.board[row][col] === 1 || this.winner != null)
            return;
        this.currentPlayer++;
        this.board[row][col] = 0 ;



        let checkResult = this.gameFieldService.checkBoard(this.board);

        if (checkResult) {
            this.winner = checkResult.winner;
            this.appService.setWinner(this.winner);
            return;
        }

        if (this.currentPlayer === 1 ||  this.currentPlayer === 3 ||(this.currentPlayer % 2)) {
            this.computerGame(row, col);
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
        this.player1 = this.appService.getPlayersName()[0];
        this.player2 = this.appService.getPlayersName()[1];
    }
}