import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BallSelectorComponent } from './components/ball-selector/ball-selector.component';
import { BetSlipComponent } from './components/bet-slip/bet-slip.component';
import { WinnerComponent } from './components/winner/winner.component';
import { FormsModule } from '../../node_modules/@angular/forms';
import { Router } from '../../node_modules/@angular/router';
import { Location } from '@angular/common';
import { BallService } from './services/ball.service';

describe('AppComponent', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{path: '', component: HomeComponent,
          children: [
            {path: '', component: BallSelectorComponent},
            {path: 'winner', component: WinnerComponent}
          ]}]),
        FormsModule
      ],
      declarations: [
        AppComponent,
        HomeComponent,
        BallSelectorComponent,
        BetSlipComponent,
        WinnerComponent
      ],
      providers: [
        Location,
        BallService
      ],
    }).compileComponents();
    router = TestBed.get(Router); 
    location = TestBed.get(Location);
    router.initialNavigation();
  });

  it('navigate directly to "winner" redirects you to ""', fakeAsync(() => { 
    router.navigate(['winner']); 
    tick(); 
    expect(location.path()).toBe(""); 
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    
    expect(app).toBeTruthy();
  }));
});
