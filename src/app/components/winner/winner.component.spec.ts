import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerComponent } from './winner.component';
import { BallService } from '../../services/ball.service';
import { RouterTestingModule } from '../../../../node_modules/@angular/router/testing';
import { Ball } from '../../model/ball';
import { By } from '../../../../node_modules/@angular/platform-browser';
import { BallSelectorComponent } from '../ball-selector/ball-selector.component';
import { HomeComponent } from '../home/home.component';
import { Location } from '@angular/common';
import { Router } from '../../../../node_modules/@angular/router';

describe('WinnerComponent', () => {
  let component: WinnerComponent;
  let fixture: ComponentFixture<WinnerComponent>;
  let service: BallService;
  let router : Router;
  let location : Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ WinnerComponent ],
      providers: [
        BallService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnerComponent);
    component = fixture.componentInstance;
    service = TestBed.get(BallService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should render won', async(() => {
    fixture.autoDetectChanges(true);
    spyOn(service, 'add').and.callThrough();
    spyOn(service, 'getWinner').and.callThrough();

    // Select first ball
    let ball : Ball = Ball.createBall(1, false);
    service.add(ball);
    fixture.detectChanges();
    expect(component.getSelectionList()).toContain(ball);    

    // Set winner number to selected ball
    component.setWinnerNumber(1);
    fixture.detectChanges();
    
    // Check: Render won correctly
    let text : HTMLElement = fixture.debugElement.query(By.css("#youWon")).nativeElement;
    expect(text.innerHTML).toContain("you won");

  }));

  it('should render lost', async(() => {
    fixture.autoDetectChanges(true);
    spyOn(service, 'getWinner').and.callThrough();

    // Select first number
    let ball : Ball = Ball.createBall(1, false);
    service.add(ball);
    fixture.detectChanges();
    expect(component.getSelectionList()).toContain(ball);    

    // Set winner number to non selected ball
    component.setWinnerNumber(2);

    // Check: Render lost correctly
    let text : HTMLElement = fixture.debugElement.query(By.css("#youLost")).nativeElement;
    expect(text.innerHTML).toContain("You lost");

  }));

  it('should restart game', async(() => {
    fixture.autoDetectChanges(true);
    spyOn(service, 'getWinner').and.callThrough();

    let button : HTMLElement = fixture.debugElement.query(By.css("button")).nativeElement;
    button.click();
    router.navigate(['']);
    expect(location.path()).toBe(""); 

  }));
});
