import { Routes } from "@angular/router";
/*import { RouterModule } from "@angular/router";*/
import { OnlineGame } from "./components/online-game/online-game.component";
import { TwoPlayersGame } from "./components/two-players-game/two-players-game.component";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
    },
    {
        path: "two-players-game",
        component: TwoPlayersGame
    },
    {
        path: "online-game",
        component: OnlineGame
    }
];