import { TestBed } from '@angular/core/testing';

import { SharedMethodsService } from './shared-methods.service';

describe('SharedMethodsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedMethodsService = TestBed.get(SharedMethodsService);
    expect(service).toBeTruthy();
  });
});
