import { Component, OnInit } from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'app-online-game',
  templateUrl: './online-game.component.html',
  styleUrls: ['./online-game.component.css']
})
export class OnlineGameComponent implements OnInit {

  constructor( ) {
  }

  private message = {
    author: 'tutorialedge',
    message: 'this is a test message'
  }



  ngOnInit() {
  }

}
