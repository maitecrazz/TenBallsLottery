import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { BallSelectorComponent } from './ball-selector.component';
import { BallService } from '../../services/ball.service';
import { By } from '../../../../node_modules/@angular/platform-browser';
import { Subscription, Observable } from '../../../../node_modules/rxjs';
import { debuglog } from 'util';

describe('BallSelectorComponent', () => {
  let component: BallSelectorComponent;
  let fixture: ComponentFixture<BallSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BallSelectorComponent ],
      providers: [
        BallService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BallSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have as balls as possible', async(() => {
    let service = TestBed.get(BallService);  
    expect(component.selectionList.length == service.possibleNumbers)
  }))

  it('should have non-selected balls number sequentially', async(() => {
    for(let i=0; i<component.selectionList.length ; i++)
      expect(component.selectionList[i].num == i+1 && !component.selectionList[i].isAlreadySelected) 
  }))

  it('should render all balls', async(() => {
    const dom = fixture.debugElement.nativeElement;
    let service = TestBed.get(BallService);

    // At least one ball is selected
    component.selectionList[0].isAlreadySelected = true;        
    expect(document.getElementsByTagName("img").length == service.maxBetNumbers)
  }))
  
  it('should call the select method to select', async(() => {
    fixture.autoDetectChanges(true);
    let service = TestBed.get(BallService);
    spyOn(service, 'add').and.callThrough();
    spyOn(component, 'select').and.callThrough();
    let img : HTMLElement = fixture.debugElement.query(By.css("img")).nativeElement;

    // Click on first img element
    img.click();
    expect(component.select).toHaveBeenCalledTimes(1);

    // Check: Class image change
    let selectedImg = document.getElementsByClassName("selectedBall")[0];

    expect(img.getAttribute('alt')).toEqual(selectedImg.getAttribute('alt'));
  }))

  it('should call the select method to deselect', async(() => {
    fixture.autoDetectChanges(true);
    let service = TestBed.get(BallService);
    spyOn(service, 'add').and.callThrough();
    spyOn(component, 'select').and.callThrough();
    service.add(component.selectionList[0]);
    let img : HTMLElement = (<HTMLElement[]><any>document.getElementsByClassName("selectedBall"))[0];

    // Click on first selected ball
    img.click();
    expect(component.select).toHaveBeenCalledTimes(1);

    // Check: Class image change
    let nonSelectedImg = document.getElementsByClassName("nonSelectedBall")[0];

    expect(img.getAttribute('alt')).toEqual(nonSelectedImg.getAttribute('alt'));
  }))

});
