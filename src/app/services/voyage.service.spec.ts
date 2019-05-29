import { TestBed, inject } from '@angular/core/testing';

import { VoyageService } from './voyage.service';

describe('VoyageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoyageService]
    });
  });

  it('should be created', inject([VoyageService], (service: VoyageService) => {
    expect(service).toBeTruthy();
  }));
});
