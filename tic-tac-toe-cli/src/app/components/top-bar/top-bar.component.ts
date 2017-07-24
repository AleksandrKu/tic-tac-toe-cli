import {Component, OnChanges} from '@angular/core';
import {AppService} from '../../app.service';

@Component({
    moduleId: module.id,
    selector: 'top-bar',
    templateUrl: 'top-bar.html',
    styleUrls: ['top-bar.css']
})
export class TopBar {
    private isSizeField: boolean = true;
    constructor(private appService: AppService) { }

    setSizeField(size: number) { // размер игрового поля
        this.appService.publishData(size);
    }

    enterName() {  // нажата кнопка Two players
        this.appService.setPlayers(true);
        this.appService.setShowHistory(false);
        this.isSizeField = false;
    }

    showHistory() {  // показать историю
        this.appService.setPlayers(false);
        this.appService.setShowHistory(true);
    }
}
