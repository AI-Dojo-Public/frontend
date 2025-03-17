import { TestBed } from '@angular/core/testing';

import { ParametrizationService } from './parametrization.service';

describe('ParametrizationService', () => {
  let service: ParametrizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParametrizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
