import { Injectable } from '@angular/core';

@Injectable()
export class BallService {

  public selectionList : number[] = [];

  constructor() { }

  getList() : number[] {
    return this.selectionList;
  }
  add(num : number){
    if(this.selectionList.includes(num)){
      var i = this.selectionList.indexOf(num);
      this.selectionList.splice(i, 1);
    }
    else{
      this.selectionList.push(num);
    }
  }

  clear(){
    this.selectionList = [];
  }

  generateWinnerNumber() : number{
    return Math.floor((Math.random() * 10) + 1);
  }

}
