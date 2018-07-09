import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BallSelectorComponent } from './components/ball-selector/ball-selector.component';
import { BetSlipComponent } from './components/bet-slip/bet-slip.component';
import { WinnerComponent } from './components/winner/winner.component';
import { FormsModule } from '../../node_modules/@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Router } from '../../node_modules/@angular/router';
import {Location} from '@angular/common';
import { BallService } from './services/ball.service';
import { By } from '../../node_modules/@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '../../node_modules/@angular/core';

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

  it('should create the app and home', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const homeFixture = TestBed.createComponent(HomeComponent);
    const homeComponent = homeFixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
    expect(homeComponent).toBeTruthy();
  }));
});
