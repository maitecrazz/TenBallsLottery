import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Ball } from '../model/ball';
import { BallSelectorComponent } from '../components/ball-selector/ball-selector.component';

@Injectable()
export class BallService {
  public readonly possibleNumbers : number = 10;
  public readonly maxBetNumbers : number = 8;

  //Lista de bolas posibles calculada con el parámetro "possibleNumbers" (para ball-selector)
  private balls : Ball[] = [];
  private observableBalls: BehaviorSubject<Ball[]> = new BehaviorSubject([]);
  private numberOfSelectedBalls : number;
  private observableSelectedBallsNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  private betAmount : number;
  private winner : number;
  private observableWinner : BehaviorSubject<number> = new BehaviorSubject(0);
  //Lista de bolas seleccionadas en orden (para bet-slip)
  private selectedBalls : Ball[];

  constructor() {
    this.generateBallList();
   }

   private generateBallList() : Ball[]{
    this.balls = [];
    this.numberOfSelectedBalls = 0;
    this.selectedBalls = [];
    this.winner = 0;

    for(var i=0 ; i<this.possibleNumbers ; i++)
      this.balls.push(Ball.createBall(i+1, false));

    this.refresh();

    return this.balls;
  }

  getObservableBalls() : Observable<Ball[]> {
    return this.observableBalls.asObservable();
  }

  getObservableSelectedBallsNumber() : Observable<number> {
    return this.observableSelectedBallsNumber.asObservable();
  }

  getObservableWinner() : Observable<number> {
    return this.observableWinner.asObservable();
  }
    
  private refresh() {
    this.observableBalls.next(this.balls);
    this.observableSelectedBallsNumber.next(this.numberOfSelectedBalls);
    this.observableWinner.next(this.winner);
  }

  add(ball : Ball){                
      if(this.balls[ball.num-1].isAlreadySelected){
        this.selectedBalls.splice(this.selectedBalls.indexOf(ball),1);
        let _ball = ball;
        _ball.isAlreadySelected = false;        
        this.balls.splice(this.balls.indexOf(ball), 1, _ball);
        this.numberOfSelectedBalls -= 1;
      } 
      else {
        if(this.numberOfSelectedBalls < this.maxBetNumbers){
          let _ball = ball;
          _ball.isAlreadySelected = true;
          this.balls.splice(this.balls.indexOf(ball), 1, _ball);          
          this.numberOfSelectedBalls += 1;
          
          this.selectedBalls.push(ball);
        }
      }
      this.refresh();
  }

  clear(){
    this.balls = this.generateBallList();
  }

  getSelectedBalls() : Ball[]{
    return this.selectedBalls.slice();
  }

  addAmount(amount : number){
    this.betAmount = amount;
  }

  getAmount() : number{
    return this.betAmount;
  }

  generateWinnerNumber(){
    this.winner = Math.floor((Math.random() * 10) + 1);
    this.refresh();
  }

  getWinner() : number{
    return this.winner;
  }

}
