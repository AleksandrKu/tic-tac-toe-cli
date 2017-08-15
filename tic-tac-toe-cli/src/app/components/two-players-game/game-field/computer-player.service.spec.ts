import { TestBed, inject } from '@angular/core/testing';

import { ComputerPlayerService } from './computer-player.service';

describe('ComputerPlayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComputerPlayerService]
    });
  });

  it('should be created', inject([ComputerPlayerService], (service: ComputerPlayerService) => {
    expect(service).toBeTruthy();
  }));
});
