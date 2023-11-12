import { TestBed } from '@angular/core/testing';

import { FavoriteUsersService } from './favorite-users.service';

describe('FavoriteUsersService', () => {
  let service: FavoriteUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
