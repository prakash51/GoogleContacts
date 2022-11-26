import { TestBed } from '@angular/core/testing';

import { GlobalErrorHandleService } from './global-error-handle.service';

describe('GlobalErrorHandleService', () => {
  let service: GlobalErrorHandleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalErrorHandleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
