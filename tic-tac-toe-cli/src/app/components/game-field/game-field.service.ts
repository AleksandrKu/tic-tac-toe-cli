import { Injectable, DoCheck, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import {AppService} from "../../app.service";

@Injectable()
export class GameFieldService  {
    private  DIMENSION : number = 3;
    private counter: number = 0;

    constructor(private appService: AppService) {
        this.appService.caseNumber$.subscribe(
            size => {
                this.DIMENSION = size;
                console.log('game field Service' + this.DIMENSION);
              });
    }

    createBoard(sizeField): any {
        let board = [];
        for (let row = 0; row < sizeField; row++) {
            board[row] = [];
            for (let col = 0; col < sizeField; col++) {
                board[row][col] = null;
            }
        }
        return board;
    };

    checkBoard(board: any) {
        let winner;
        // Check rows Если в строке выигрышная комбинация, то winner присваивается 1 или 0 в зависимости , кто выиграл
        /*winner = board.reduce((hasWon, row) => hasWon || this.check(row), false);*/
        winner = board.reduce((hasWon: any, row: any) =>
        {
          return  hasWon || this.check(row);
        }, false); //  в качестве первого аргумента при первом вызове функции

        // Check cols
        let cols = [];
        for (let i = 0; i < this.DIMENSION; i++) {
            cols.push(board.map((row: any) => row[i]));
        }
        winner = winner || cols.reduce((hasWon, col) => hasWon || this.check(col), false);

        // Check diagonals
        let diagonals = [
            board.map((row: any, i: number) => row[i]),
            board.map((row: any, i:number) => row[this.DIMENSION-1-i])
        ];
        winner = winner || diagonals.reduce((hasWon, diagonal) => hasWon || this.check(diagonal), false);

        return winner;
    }
    check(array: any) {
        /*console.log(arr);*/
        let clone = array.slice(0);
        let sum = 0;
        while(clone.length) {
            let val = clone.pop();
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
    }


    increment() {
        this.counter ++;
    };

    getValue() {
        return this.counter;
    }

    getRealTime() {
        let date = new Date();
        return date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + " (" + date.getHours() + ":" + date.getMinutes()+")";
    }
}
