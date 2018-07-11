import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { BallSelectorComponent } from '../ball-selector/ball-selector.component';
import { BetSlipComponent } from '../bet-slip/bet-slip.component';
import { WinnerComponent } from '../winner/winner.component';
import { Ball } from '../../model/ball';
import { BallService } from '../../services/ball.service';
import { RouterTestingModule } from '../../../../node_modules/@angular/router/testing';
import { FormsModule } from '../../../../node_modules/@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        HomeComponent,
        BallSelectorComponent,
        BetSlipComponent,
        WinnerComponent
      ],
      providers: [
        BallService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
