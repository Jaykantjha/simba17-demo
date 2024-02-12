import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { tokenRedirectGuard } from './token-redirect.guard';

describe('tokenRedirectGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => tokenRedirectGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
