import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BallService } from '../../services/ball.service';

@Component({
  selector: 'ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.css']
})
export class BallSelectorComponent implements OnInit {

  @Output() selectNumber : EventEmitter<number> = new EventEmitter<number>();

  constructor(private ballService : BallService) { }

  ngOnInit() {  
  }

  select(num : number){
    this.ballService.add(num);
  }

  clear(){
    this.ballService.clear();
  }

}
