import { TestBed, inject } from '@angular/core/testing';

import { BallService } from './ball.service';

describe('BallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BallService]
    });
  });

  it('should be created', inject([BallService], (service: BallService) => {
    expect(service).toBeTruthy();
  }));
});
