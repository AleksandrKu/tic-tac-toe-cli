import { Component } from '@angular/core';
import { AppService } from '../../../app.service';

@Component({
    moduleId: module.id,
    selector: 'top-bar',
    templateUrl: './top-bar.html',
    styleUrls: ['./top-bar.css']
})
export class TopBarComponent {
    public isSizeField: boolean = true;
    public isTwoPlayers: boolean = true;
    public isOnePlayer: boolean = true;
    constructor(private appService: AppService) { }

    setSizeField(size: number) { // размер игрового поля
        this.appService.publishData(size);
    }

    enterTwoNames() {  // нажата кнопка Two players
        this.appService.setPlayers(true);
        this.appService.setShowHistory(false);
        this.isSizeField = false;
        this.isOnePlayer = false;
    }

    playWithComputer(){  // нажата кнопка With computer
        this.appService.setOnePlayer(true);
        this.appService.setShowHistory(false);
        this.isSizeField = false;
        this.isTwoPlayers = false;
    }

    showHistory() {  // показать историю
        this.appService.setPlayers(false);
        this.appService.setOnePlayer(false);
        this.appService.setShowHistory(true);
    }
}
