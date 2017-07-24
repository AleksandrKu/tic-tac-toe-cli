import {Component, DoCheck, OnInit} from '@angular/core';
import {AppService} from "../../app.service";
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
@Component({
    moduleId: module.id,
    selector: 'history-game',
    templateUrl: './history-game.html',
    styleUrls: ['./history-game.scss']
})
export class HistoryGames implements DoCheck, OnInit {
    private showHistory: boolean = false;
    private date: any;
    private numberGames: number;
    private player1: string;
    private player2: string;
    private score: string;
    private item: any;
    private i: number = 0;
    /* private numberOfGlobalGames : number = 0;*/
    items: FirebaseListObservable<any[]>;

    constructor(private appService: AppService,
                private db: AngularFireDatabase) {
        this.items = this.db.list('/games',{
            query: {
                orderByKey: false,
               /* orderByChild: 'size',
                equalTo: 'large'*/
            }
        });

    }

    ngDoCheck() {
        this.showHistory = this.appService.getShowHistory();

        /*this.item = this.db.object('/games', {preserveSnapshot: true});
         this.item.subscribe(snapshot => {

         this.date = snapshot.val().date;
         this.player1 = snapshot.val().player1;
         this.player2 = snapshot.val().player2;
         this.numberGames = snapshot.val().numberGames;
         this.score = snapshot.val().player1Points  + " - " + snapshot.val().player2Points;
         })*/


        /*this.items = this.db.list('/games', { preserveSnapshot: true });
         this.items
         .subscribe(snapshots => {
         snapshots.forEach(snapshot => {
         console.log(snapshot.key)
         console.log(snapshot.val())
         });
         })*/

    }

    ngOnInit() {

       /* this.items = this.db.list('/games', {preserveSnapshot: true});
/!*console.log(this.items);*!/
        this.items
            .subscribe(snapshots => {
                snapshots.forEach(snapshot => {
                    this.date = snapshot.val().date;
                    this.player1 = snapshot.val().player1;
                    this.player2 = snapshot.val().player2;
                    this.numberGames = snapshot.val().numberGames;
                    this.score = snapshot.val().player1Points + " - " + snapshot.val().player2Points;
                    console.log(snapshot.key)
                    console.log(snapshot.val())
                });
            })*/

         /*this.items.forEach( items => {
         this.i = items.length;
         this.date = items[0].date;
         this.numberGames = items.length;
         console.log(items);
         });*/

    }
}