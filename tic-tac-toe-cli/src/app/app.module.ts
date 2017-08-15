import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { FormsModule }    from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MdButtonModule, MdCardModule, MdCheckboxModule, MdMenuModule, MdIconModule, MdGridListModule, MdToolbarModule } from '@angular/material';

import { ScoreTableComponent, GameFieldComponent, HistoryGamesComponent, PlayerNameComponent }  from './components/two-players-game/index';
import { TopBarComponent } from './components/two-players-game/top-bar/top-bar.component'

import { AppService } from './app.service';
import { AppComponent } from './app.component';

// AngularFire Imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
/*import { RegistrationComponent } from './components/registration/registration.component';*/

import { RouterModule } from '@angular/router';
/*import { Routes } from '@angular/router';*/
import { routes } from "./app.routes";
import { OnlineGameComponent } from './components/online-game/online-game.component';
import { TwoPlayersGameComponent } from './components/two-players-game/two-players-game.component';


@NgModule({
  declarations: [
    AppComponent, GameFieldComponent, PlayerNameComponent, ScoreTableComponent, TopBarComponent, HistoryGamesComponent,
    OnlineGameComponent, TwoPlayersGameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule, MdButtonModule, MdCheckboxModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    MdMenuModule, MdIconModule, MdGridListModule, MdToolbarModule, MdCardModule,
    RouterModule.forRoot(routes)

  ],
  exports: [MdButtonModule, MdCheckboxModule],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
