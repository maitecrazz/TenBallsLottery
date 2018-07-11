import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { BallSelectorComponent } from './ball-selector.component';
import { BallService } from '../../services/ball.service';
import { By } from '../../../../node_modules/@angular/platform-browser';

describe('BallSelectorComponent', () => {
  let component: BallSelectorComponent;
  let fixture: ComponentFixture<BallSelectorComponent>;
  let service: BallService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BallSelectorComponent ],
      providers: [
        BallService
      ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BallSelectorComponent);
    component = fixture.componentInstance;
    service = TestBed.get(BallService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have as balls as possible', async(() => {
    expect(component.getSelectionList().length == service.possibleNumbers)
  }))

  it('should have non-selected balls number sequentially', async(() => {
    for(let i=0; i<component.getSelectionList().length ; i++)
      expect(component.getSelectionList()[i].num == i+1 && !component.getSelectionList()[i].isAlreadySelected) 
  }))

  it('should render all balls', async(() => {
    // At least one ball is selected
    component.getSelectionList()[0].isAlreadySelected = true;        
    expect(fixture.debugElement.queryAll(By.css("img")).length == service.maxBetNumbers)
  }))
  
  it('should call the select method to select', async(() => {
    fixture.autoDetectChanges(true);
    spyOn(service, 'add').and.callThrough();
    spyOn(component, 'select').and.callThrough();
    let img : HTMLElement = fixture.debugElement.query(By.css("img")).nativeElement;

    // Click on first img element
    img.click();

    expect(component.select).toHaveBeenCalledTimes(1);

    // Check: Class image change
    let selectedImg = fixture.debugElement.queryAll(By.css(".selectedBall"))[0].nativeElement;

    expect(img.getAttribute('alt')).toEqual(selectedImg.getAttribute('alt'));
  }))

  it('should call the select method to deselect', async(() => {
    fixture.autoDetectChanges(true);
    spyOn(service, 'add').and.callThrough();
    spyOn(component, 'select').and.callThrough();

    // Select first ball
    let img : HTMLElement = fixture.debugElement.queryAll(By.css("img"))[0].nativeElement;
    img.click();

    // Deselect first ball
    let selectedImage : HTMLElement = fixture.debugElement.queryAll(By.css(".selectedBall"))[0].nativeElement;
    selectedImage.click();
    
    // Check: Class image change
    let nonSelectedImage : HTMLElement = fixture.debugElement.queryAll(By.css(".nonSelectedBall"))[0].nativeElement;

    expect(component.select).toHaveBeenCalledTimes(2);
    expect(nonSelectedImage.getAttribute('alt')).toEqual(selectedImage.getAttribute('alt'));
  }))

  it('should render Clear selection link', async(() => {
    let button : HTMLElement = fixture.debugElement.query(By.css("button")).nativeElement;
    
    expect(button.innerText == "Clear selection")
  }))

  it('should clear selection on button click', async(() => {
    fixture.autoDetectChanges(true);
    spyOn(service, 'getSelectedBalls').and.callThrough();
    spyOn(component, 'select').and.callThrough();

    component.select(component.getSelectionList()[0]);    
    expect(service.getSelectedBalls().length).toEqual(1);

    let button : HTMLElement = fixture.debugElement.query(By.css("button")).nativeElement;
    button.click();

    expect(service.getSelectedBalls().length).toEqual(0);
  }))
});
