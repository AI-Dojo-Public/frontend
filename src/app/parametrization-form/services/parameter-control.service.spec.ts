import { TestBed } from '@angular/core/testing';

import { ParameterControlService } from './parameter-control.service';

describe('ParameterControlService', () => {
  let service: ParameterControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParameterControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
