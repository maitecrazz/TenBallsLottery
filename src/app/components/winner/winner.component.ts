import { Component, OnInit } from '@angular/core';
import { BallService } from '../../services/ball.service';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnInit {
  countdown(arg0: any): any {
    throw new Error("Method not implemented.");
  }

  private winner : number;
  private youWon : boolean;
  public $counter: Observable<number>;
  stoped: any;
  diff: number;
  future: number;
  subscription: any;
  message: any;

  constructor(private ballService : BallService) { }

  ngOnInit() {
    this.countDown();
    this.getWinner();
  }

  getWinner(){
    this.winner = this.ballService.generateWinnerNumber();
    this.youWon = false;
    for(let num of this.ballService.selectionList){
      if(this.winner === num){
        this.youWon = true;
        break;
      }
    }
  }

  countDown(){
    var secondsLeft = 3000;
      
    this.$counter = Observable.interval(1000).pipe((x) => { 
        Math.round(Math.floor(secondsLeft) / 1000);   
        return x;
    });
    
    this.subscription = this.$counter.subscribe((x) => this.message = this.countdown(this.diff));
  }

}
