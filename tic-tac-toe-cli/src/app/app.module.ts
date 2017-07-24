import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { FormsModule }    from '@angular/forms';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {MdButtonModule, MdCardModule, MdCheckboxModule, MdMenuModule, MdIconModule, MdGridListModule, MdToolbarModule} from '@angular/material';

import { GameField, HistoryGames, PlayerName, ScoreTable, Stopwatch }  from './components/index';
import { TopBar } from './components/top-bar/top-bar.component';
import { AppService } from './app.service';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent, GameField, PlayerName, ScoreTable, Stopwatch, TopBar, HistoryGames
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule, MdButtonModule, MdCheckboxModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    MdMenuModule, MdIconModule, MdGridListModule, MdToolbarModule, MdCardModule

  ],
  exports: [MdButtonModule, MdCheckboxModule],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
