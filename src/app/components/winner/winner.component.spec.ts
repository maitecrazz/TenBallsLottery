import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerComponent } from './winner.component';
import { BallService } from '../../services/ball.service';
import { RouterTestingModule } from '../../../../node_modules/@angular/router/testing';

describe('WinnerComponent', () => {
  let component: WinnerComponent;
  let fixture: ComponentFixture<WinnerComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
