import { Component, OnInit, Input, OnChanges, DoCheck, Renderer2, SimpleChanges, ViewChild, ElementRef, AfterViewInit, ContentChildren } from '@angular/core';
import { BallService } from '../../services/ball.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Ball } from '../../model/ball';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.css']
})

export class BetSlipComponent implements OnInit {
  @ViewChild('amountInput', {read: ElementRef}) input: ElementRef;
  readonly error : string = "Minimum bet is 5€";
  private amount : number = this.ballService.minimumAmountBet;
  private selectedNumbersQuantity : number = 0;
  private selectedBalls : Ball[] = [];
  private winnerGenerated : boolean = false;
  // private readonly amountObservable$: Observable<number> = new Observable<number>((observer) => {
  //   observer.next(this.amount);
  //   observer.complete();
  // });

  constructor(private ballService : BallService,
    private router : Router,
    private renderer : Renderer2) { }

  ngOnInit() {
    this.ballService.getObservableWinner().subscribe(num => {      
      this.winnerGenerated = num > 0? true : false;      
      if(this.winnerGenerated)      
        this.renderer.setAttribute(this.input.nativeElement, "disabled", "true");
      else
        this.renderer.removeAttribute(this.input.nativeElement, "disabled");
    });
    this.ballService.getObservableBalls().subscribe(list => {
      this.selectedBalls = this.ballService.getSelectedBalls();      
      this.selectedNumbersQuantity = this.selectedBalls.length;
      if(this.selectedBalls.length < this.ballService.maxBetNumbers){
        for(let i=0 ; i < this.ballService.maxBetNumbers - this.selectedNumbersQuantity; i++)
          this.selectedBalls.push(Ball.createBall(0, false));
      }
      this.calculateError();
    });    
  }

  private calculateError(){
    if(!this.amount || (this.amount*this.selectedNumbersQuantity < this.ballService.minimumAmountBet 
        && this.selectedNumbersQuantity > 0)){
      this.renderer.addClass(this.input.nativeElement, "border");
      this.renderer.addClass(this.input.nativeElement, "border-danger");
      this.renderer.addClass(this.input.nativeElement, "form-error")
    }
    else{
      this.renderer.removeClass(this.input.nativeElement, "border");
      this.renderer.removeClass(this.input.nativeElement, "border-danger");
      this.renderer.removeClass(this.input.nativeElement, "form-error")
    }
  }

  bet(){
    if(this.selectedNumbersQuantity > 0
      && !(this.amount == undefined || this.amount * this.selectedNumbersQuantity < 5)){
        this.winnerGenerated = true;
        this.ballService.generateWinnerNumber();
        this.ballService.addAmount(this.amount * this.selectedNumbersQuantity);
        this.router.navigateByUrl("winner", { skipLocationChange: true });
      }
    }

    getSelectedBalls() : Ball[]{
      return this.selectedBalls;
    }

    getselectedNumbersQuantity(){
      return this.selectedNumbersQuantity;
    }
}
