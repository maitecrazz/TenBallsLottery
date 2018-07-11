import { Component, OnInit, OnDestroy } from '@angular/core';
import { BallService } from '../../services/ball.service';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';
import { Ball } from '../../model/ball';


@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnInit {

  private winner : number;
  private youWon : boolean;
  private numbersQuantity : number;
  private selectionList : Ball[] = [];
  private betAmount : number;

  // Countdown attributes

  // private millisecondsLeft : number = 3000;
  // private $counter : Subscription = new Subscription();

  constructor(private ballService : BallService,
    private router : Router) { }

  ngOnInit() {
    this.ballService.getObservableSelectedBallsNumber().subscribe(num => {
      if(num == undefined || num <= 0){
        this.router.navigate([""]);
      }
      else{
        this.ballService.getObservableBalls().subscribe(list => {
          this.selectionList = list;
          this.betAmount = this.ballService.getAmount();
          this.winner = this.ballService.getWinner();
          this.getWinner();
          // this.countDown();
      });
      }
    });
  }

  getWinner(){
    this.youWon = false;
      for(let ball of this.selectionList){
        if(ball.isAlreadySelected && this.winner === ball.num){
          this.youWon = true;
          break;
        }
      }
  }

  restartGame(){
    this.ballService.clear();
    this.router.navigate(['']);
  }

  getSelectionList() : Ball[]{
    return this.selectionList;
  }

  // countDown(){      
  //   this.$counter = Observable.interval(1000)
  //     .subscribe(passedTime => {
  //       if(this.millisecondsLeft - passedTime > 1000){
  //         this.millisecondsLeft -= 1000;
  //       }  
  //       else{
  //         this.millisecondsLeft -= 1000;
  //         this.$counter.unsubscribe();
  //         this.getWinner();
  //       }
  //   });
  // 
  // }

  // ngOnDestroy(){
  //   this.$counter.unsubscribe();
  // }

  // Set method to component test
  setWinnerNumber(num : number){
    this.youWon = true;
  }

}
