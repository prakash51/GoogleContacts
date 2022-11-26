import { TestBed } from '@angular/core/testing';

import { GoogleContactsService } from './google-contacts.service';

describe('GoogleContactsService', () => {
  let service: GoogleContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
