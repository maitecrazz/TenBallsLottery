import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BallService } from '../../services/ball.service';
import { Ball } from '../../model/ball';
import { debuglog } from 'util';

@Component({
  selector: 'ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.css']
})
export class BallSelectorComponent implements OnInit {
  private selectionList : Ball[];

  constructor(private ballService : BallService) { }

  ngOnInit() {  
    this.ballService.getObservableBalls().subscribe(list => this.selectionList = list);
  }

  select(ball : Ball){    
    this.ballService.add(ball);
  }

  clear(){
    this.ballService.clear();
  }

  getSelectionList() : Ball[] {
    return this.selectionList;
  }

}
