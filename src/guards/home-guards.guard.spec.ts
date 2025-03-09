import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { homeGuardsGuard } from './home-guards.guard';

describe('homeGuardsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => homeGuardsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
