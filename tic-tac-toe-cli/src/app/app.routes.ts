import { Routes } from "@angular/router";
/*import { RouterModule } from "@angular/router";*/

import { OnlineGameComponent } from "./components/online-game/online-game.component";
import { TwoPlayersGameComponent } from "./components/two-players-game/two-players-game.component";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "two-players-game",
        pathMatch: "full",
    },
    {
        path: "two-players-game",
        component: TwoPlayersGameComponent
    },
    {
        path: "online-game",
        component: OnlineGameComponent
    }
];