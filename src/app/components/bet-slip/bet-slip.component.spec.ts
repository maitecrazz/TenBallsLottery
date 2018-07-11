import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BetSlipComponent } from './bet-slip.component';
import { BallService } from '../../services/ball.service';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { RouterTestingModule } from '../../../../node_modules/@angular/router/testing';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { By } from '../../../../node_modules/@angular/platform-browser';
import { Ball } from '../../model/ball';

describe('BetSlipComponent', () => {
  let component: BetSlipComponent;
  let fixture: ComponentFixture<BetSlipComponent>;
  let router : Router
  let service : BallService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [ BetSlipComponent ],
      providers: [
        BallService,
        Location
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetSlipComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    router.initialNavigation(); 
    service = TestBed.get(BallService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  // ------- TESTING INITIAL COMPONENT STATE --------------
  it('should render selected balls list at initial state', async(() => {
    // Check: img tags number = max numbers to bet for
    expect(fixture.debugElement.queryAll(By.css("img#nonBelectedBetBall")).length).toEqual(service.maxBetNumbers);
  }));

  it('should render input initial state', async(() => {
    fixture.autoDetectChanges(true);
    // Check: input inner text = minimum to bet
    let input : HTMLElement = fixture.debugElement.query(By.css("input")).nativeElement;   
    expect(input.attributes.item(8).value).toEqual("" + service.minimumAmountBet);
  }));

  it('should render amount initial state', async(() => {
    // Check: label inner text = 0
    let label : HTMLElement = fixture.debugElement.query(By.css("#label")).nativeElement;
    expect(label.innerText).toEqual("x0");
  }));
  
  it('should render total initial state', async(() => {
    // Check: total = 0
    let total : HTMLElement = fixture.debugElement.query(By.css("#total")).nativeElement;
    expect(total.innerText).toEqual("Total: 0 €");
  }));

  it('should render button initial state', async(() => {
    // Check: button state = disabled
    let button : HTMLElement = fixture.debugElement.query(By.css("button")).nativeElement;    
    expect(button.className).toContain("disabled");
  }));

  // ------- TESTING BET ACTION --------------
  it('should let to bet with no errors', async (() => {
    fixture.autoDetectChanges(true);
    spyOn(service, 'add').and.callThrough();
    spyOn(component, 'bet');

    // Select first ball
    let ball : Ball = Ball.createBall(1, false);
    service.add(ball);  
    fixture.detectChanges();  
    expect(component.getSelectedBalls()).toContain(ball);

    // Check: selectedQuantity = 1
    expect(component.getselectedNumbersQuantity()).toEqual(1);

    // Check: total = min amount to bet
    let total : HTMLElement = fixture.debugElement.query(By.css("#total")).nativeElement;
    expect(total.textContent).toEqual("Total: "+ service.minimumAmountBet +" €");

    // Check: Button state = enabled
    let button : HTMLElement = fixture.debugElement.query(By.css("button")).nativeElement;    
    expect(button.className).not.toContain("disabled");

    // Check: Press bet button calls bet function
    button.click();
    expect(component.bet).toHaveBeenCalledTimes(1); 
  }));

  it("shouldn't let to bet: empty input value", async (() => {
    fixture.autoDetectChanges(true);
    spyOn(service, 'add').and.callThrough();

    // Select first ball
    let ball : Ball = Ball.createBall(1, false);
    service.add(ball);  
    expect(component.getSelectedBalls()).toContain(ball);

    // Set amount to empty
    let input : HTMLElement = fixture.debugElement.query(By.css("input")).nativeElement;
    input.attributes.item(8).value = "";
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(input.attributes.item(8).value).toEqual("");

    // Check: Showed error
    let error : HTMLElement = fixture.debugElement.query(By.css("#error")).nativeElement;  
    expect(error.innerText).toEqual(component.error);

    // Check: Button state = enabled
    let button : HTMLElement = fixture.debugElement.query(By.css("button")).nativeElement;    
    expect(button.className).toContain("disabled");
  }));

  it("shouldn't let to bet: < min to bet", async (() => {
    fixture.autoDetectChanges(true);
    spyOn(service, 'add').and.callThrough();

    // Select first ball
    let ball : Ball = Ball.createBall(1, false);
    service.add(ball);  
    expect(component.getSelectedBalls()).toContain(ball);

    // Set amount to empty
    let input : HTMLElement = fixture.debugElement.query(By.css("input")).nativeElement;
    input.attributes.item(8).value = "4";
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(input.attributes.item(8).value).toEqual("");

    // Check: Showed error
    let error : HTMLElement = fixture.debugElement.query(By.css("#error")).nativeElement;  
    expect(error.innerText).toEqual(component.error);

    // Check: Button state = enabled
    let button : HTMLElement = fixture.debugElement.query(By.css("button")).nativeElement;    
    expect(button.className).toContain("disabled");
  }));
  
});
