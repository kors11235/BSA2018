import { TestBed, async, inject } from '@angular/core/testing';

import { ShowPasswordGuard } from './show-password.guard';

describe('ShowPasswordGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowPasswordGuard]
    });
  });

  it('should ...', inject([ShowPasswordGuard], (guard: ShowPasswordGuard) => {
    expect(guard).toBeTruthy();
  }));
});
