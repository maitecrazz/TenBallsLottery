import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetSlipComponent } from './bet-slip.component';
import { BallService } from '../../services/ball.service';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { RouterTestingModule } from '../../../../node_modules/@angular/router/testing';

describe('BetSlipComponent', () => {
  let component: BetSlipComponent;
  let fixture: ComponentFixture<BetSlipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [ BetSlipComponent ],
      providers: [
        BallService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
