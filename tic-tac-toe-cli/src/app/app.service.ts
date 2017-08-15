import {Injectable} from "@angular/core";
import { Subject }    from 'rxjs/Subject';
@Injectable()
export class AppService {
    private nameTrue: boolean;
    private isOnePlayerName: boolean;
    private winner: number;
    private winner_x: number = 0;
    private winner_0: number = 0;
    public restart: boolean = false;

    private player1: string;
    private player2: string;
    private player: string;
    private numberGame: number = 0;
    private showHistory: boolean = false;

    private sizeField: number = 3;
//*****************************************************
    // Observable string sources
    private caseNumber = new Subject<number>();
    // Observable string streams
    caseNumber$ = this.caseNumber.asObservable();
    // Service message commands
    publishData(size: number) {
        this.caseNumber.next(size);
        }
//*****************************************************

    setPlayersName(player1: string, player2: string) {
        this.player1 = player1;
        this.player2 = player2;
    }

    getPlayersName() {
        return [this.player1, this.player2] ;
    }

    setPlayers(name: boolean) {
       /* console.log("service name " + name);*/
        this.nameTrue = name;
    }

    getPlayers() {
        return this.nameTrue;
    }

    setOnePlayer(is : boolean){
        this.isOnePlayerName = is;
    }
    getOnePlayer() {
        return this.isOnePlayerName;
    }

    setOnePlayerName(player: string) {
        this.player = player;
    }

    getOnePlayerName() {
        return this.player ;
    }



    setWinner(winner: number) {
       /* console.log("winner " + winner);*/
        this.winner = winner;
        if (this.winner == 0) {
            this.winner_x++;
            this.restart = false;
        }
        if (this.winner == 1) {
            this.winner_0++;
            this.restart = false;
        }
    }

    getWinner() {
        return this.winner;
    }

    getWinnerX() {
        return this.winner_x;
    }

    getWinner0() {
        return this.winner_0;
    }


    setRestartGame() {
        this.restart = true;
    }

    setNumberGame() {
        this.numberGame ++ ;
    }

    getNumberGame() {
        return this.numberGame;
    }

    setShowHistory( bool : boolean) {
        this.showHistory = bool;
    }
    getShowHistory() {
        return this.showHistory;
    }

    /*setSizeField(size: number) {
        this.sizeField = size;
    }*/
   /* getSizeField() {
        return this.sizeField;
    }*/

}
