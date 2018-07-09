import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { BallSelectorComponent } from './ball-selector.component';
import { BallService } from '../../services/ball.service';
import { By } from '../../../../node_modules/@angular/platform-browser';
import { Subscription } from '../../../../node_modules/rxjs';
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
  
  it('should call the select method', async(() => {
    let service = TestBed.get(BallService);
    spyOn(component, 'select');
    let img : HTMLElement = document.getElementsByTagName("img")[0];
    console.log("first image", img);
    // Click on first img element
    console.log("servicio antes", service);

    img.click();
    // tick();
    console.log("servicio despues", service);


    expect(component.select).toHaveBeenCalledTimes(1);
    console.log("ruebaa", component.selectionList);
    
    console.log("second image", document.getElementsByTagName("img"));
    console.log("attribute", img.getAttribute('alt'));
    // expect(img.getAttribute('alt')).toEqual(selectedImg.getAttribute('alt'));
  }))


});
