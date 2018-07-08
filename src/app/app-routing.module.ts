import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WinnerComponent } from './components/winner/winner.component';
import { BallSelectorComponent } from './components/ball-selector/ball-selector.component';

const routes: Routes = [
  {path: '', component: HomeComponent,
    children: [
      {path: '', component: BallSelectorComponent},
      {path: 'winner', component: WinnerComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
