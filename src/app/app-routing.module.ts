import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WinnerComponent } from './components/winner/winner.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'winner', component: WinnerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
