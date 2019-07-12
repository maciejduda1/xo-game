import { ResultsComponent } from './results/results.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './start/start.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  {path: '', redirectTo: 'start', pathMatch: 'full' },
  {path: 'start', component: StartComponent },
  {path: 'game/:name', component: GameComponent},
  {path: 'results', component: ResultsComponent},
  {path: '**', redirectTo: 'start'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
