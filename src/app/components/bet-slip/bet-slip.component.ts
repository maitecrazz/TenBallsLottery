import { Component, OnInit, Input } from '@angular/core';
import { BallService } from '../../services/ball.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.css']
})

export class BetSlipComponent implements OnInit {

  private error : string;
  private amount : number = 5;

  constructor(private ballService : BallService,
    private router : Router) { }

  ngOnInit() {

  }

  bet(){
    if(this.amount == undefined || this.amount < 5){
      this.error = "Minimum amount of 5€"
    }
    else if(!(this.ballService.selectionList.length > 0)){
      this.error = "Select at leat one ball"
    }
    else{
      this.error = "";
    }
    this.router.navigateByUrl("winner", { skipLocationChange: true });
  }
}
