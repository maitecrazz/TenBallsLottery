import { TestBed, inject, tick } from '@angular/core/testing';

import { BallService } from './ball.service';
import { Ball } from '../model/ball';
import { async } from '../../../node_modules/@types/q';

describe('BallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BallService]
    });
  });

  it('should be correctly created', inject([BallService], (service: BallService) => {
    service = new BallService();
    // Check: create component
    expect(service).toBeTruthy();

    // Check: balls list with possible numbers
    let testBalls : Ball[] = undefined;
    service.getObservableBalls().subscribe(balls => testBalls = balls);
    expect(testBalls).toBeDefined();
    expect(testBalls.length).toEqual(service.possibleNumbers);

    // Check: selectedBalls = []
    expect(service.getSelectedBalls().length).toEqual(0);

    // Check: numberOfSelectedBalls = 0
    let numberOfSelectedBalls : number = undefined;
    service.getObservableSelectedBallsNumber().subscribe(balls => numberOfSelectedBalls = balls);
    expect(numberOfSelectedBalls).toBeDefined();
    expect(numberOfSelectedBalls).toEqual(0);

    // Check: winner = 0
    expect(service.getWinner()).toEqual(0);
  }));

  it('should add non selected ball', inject([BallService], (service: BallService) => {
    service = new BallService();

    // Add first ball
    let ball : Ball = Ball.createBall(1,false);
    service.add(ball);
    expect(service.getSelectedBalls().includes(ball)).toBeTruthy();
  }));

  it('should remove non selected ball', inject([BallService], (service: BallService) => {
    service = new BallService();

    // Add first ball
    let ball : Ball = Ball.createBall(1,false);
    service.add(ball);
    // Remove first ball
    service.add(ball);
    
    expect(service.getSelectedBalls().includes(ball)).toBeFalsy();
  }));

  it('should clear non selected ball', inject([BallService], (service: BallService) => {
    service = new BallService();

    // Add first ball
    let ball : Ball = Ball.createBall(1,false);
    service.add(ball);
    expect(service.getSelectedBalls().includes(ball)).toBeTruthy();

    service.clear();
    expect(service.getSelectedBalls().includes(ball)).toBeFalsy();
  }));

  it("should add amount >= minimum", inject([BallService], (service: BallService) => {
    service = new BallService();

    // Add amount
    service.addAmount(service.minimumAmountBet);
    expect(service.getAmount()).toEqual(service.minimumAmountBet);
  }));

  it("shouldn't add amount < minimum", inject([BallService], (service: BallService) => {
    service = new BallService();

    // Add amount
    service.addAmount(1);
    expect(service.getAmount()).not.toEqual(1);
  }));

  it("should generate winner number", inject([BallService], (service: BallService) => {
    service = new BallService();

    // Generate number
    service.generateWinnerNumber();
    expect(service.getWinner()).toBeDefined();
    expect(service.getAmount()).not.toEqual(0);
    expect(service.getWinner()).not.toBeGreaterThan(service.possibleNumbers);
  }));
});
