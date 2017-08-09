import {Injectable, DoCheck, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';
import {AppService} from "../../../app.service";
import {element} from "protractor";

@Injectable()
export class GameFieldService {
    private DIMENSION: number = 3;
    private counter: number = 0;

    constructor(private appService: AppService) {
        this.appService.caseNumber$.subscribe(
            size => {
                this.DIMENSION = size;
              /*  console.log('game field Service' + this.DIMENSION);*/
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
       /* console.log(board);*/
        let winner;
        // Check rows Если в строке выигрышная комбинация, то winner присваивается 1 или 0 в зависимости , кто выиграл
        winner = board.reduce((hasWon: any, row: any) => {
           /* console.log(board);*/
            return hasWon || this.check(row);
        }, false); //  в качестве первого аргумента при первом вызове функции

        // Check cols
        let cols = [];
        for (let i = 0; i < this.DIMENSION; i++) {
            cols.push(board.map((row: any) => row[i]));
        }
        winner = winner || cols.reduce((hasWon, col) => hasWon || this.check(col), false);

        // Check diagonals
        let diagonals = [
            board.map((row: any, i: number) => row[i]), //средняя диагональ слева-сверху вниз
            board.map((row: any, i: number) => row[this.DIMENSION - 1 - i]),  // справа сверху вниз

            board.map((row: any, i: number) => row[i+1]),
            board.map((row: any, i: number) => row[i-1]),

            board.map((row: any, i: number) => row[i+2]),
            board.map((row: any, i: number) => row[i-2]),

            board.map((row: any, i: number) => row[this.DIMENSION - 2 - i]),
            board.map((row: any, i: number) => row[this.DIMENSION  - i]),

            board.map((row: any, i: number) => row[this.DIMENSION - 3 - i]),
            board.map((row: any, i: number) => row[this.DIMENSION  + 1 - i]),

        ];
        winner = winner || diagonals.reduce((hasWon, diagonal) => hasWon || this.check(diagonal), false);
        return winner;



    }

    check(array: any) {
        let sizeField: number = this.DIMENSION;
        let clone = array.slice(0);
        let sum: number = 0;
        let valBefore: number;
        if (sizeField <= 5) {
            while (clone.length) {
                let val = clone.pop();
                if (val == null) {
                    return;
                }
                sum += val;
               /* console.log(sum);*/
            }
            if (sum === 0 || (sum === sizeField)) {
                return {winner: sum / sizeField};
            }
            return;
        } else if (sizeField > 5) {
            let winArray: any = [];

            for (let i = 1; i <= sizeField; i++) {
                console.log(clone);
                let val = clone.pop();

                if (val == null) {
                    valBefore = val;
                    winArray = [];
                    continue;
                } else {
                    winArray.push(val);
                    if(winArray.length >= 5) break;
                   /* console.log(winArray);
                    console.log(" We have  ");*/
                }
            }
            if (winArray.length == 5) {
               /* console.log(" We have winner!" + winArray);*/
                sum = winArray.reduce(function (result, current) {
                    return result + current;
                }, 0);
                if (sum === 0 || sum === 5) return {winner: sum / 5};
            } else {
                return;
            }
        }


    }


    increment() {
        this.counter++;
    };

    getValue() {
        return this.counter;
    }

    getRealTime() {
        let date = new Date();
        let month = (date.getMonth()>=9) ? (+date.getMonth())+1 : '0'+(+date.getMonth()+1);
        let day = (date.getDate()<10) ? '0' + date.getDate() : date.getDate();
        let hour = (date.getHours()<10) ? '0' + date.getHours() : date.getHours();
        let minute = (date.getMinutes()<10) ? '0' + date.getMinutes() : date.getMinutes();


        return  " (" + hour + ":" + minute + " ) " + day + "." + month+"." + date.getFullYear();
    }
}
