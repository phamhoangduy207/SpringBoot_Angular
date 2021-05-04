import { TestBed } from '@angular/core/testing';

import { HttpinterceptorService } from '../services/httpinterceptor.service';

describe('HttpinterceptorService', () => {
  let service: HttpinterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpinterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
