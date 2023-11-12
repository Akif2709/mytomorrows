import { TestBed } from '@angular/core/testing';
import { FavoriteUsersService } from './favorite-users.service';
import { User } from '@mytomorrows/shared-models';

describe('FavoriteUsersService', () => {
  let service: FavoriteUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoriteUsersService],
    });
    service = TestBed.inject(FavoriteUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with an empty list of favorite users', () => {
    service.getFavoriteUsers().subscribe((users) => {
      expect(users).toEqual([]);
    });
  });

  it('should add a user to the list of favorite users', () => {
    const userToAdd: User = { id: 1, first_name: 'John Doe' } as User;

    service.addFavoriteUser(userToAdd);

    service.getFavoriteUsers().subscribe((users) => {
      expect(users).toEqual([userToAdd]);
    });
  });

  it('should remove a user from the list of favorite users', () => {
    const user1: User = { id: 1, first_name: 'John Doe' } as User;
    const user2: User = { id: 2, first_name: 'Jane Doe' } as User;

    service.addFavoriteUser(user1);
    service.addFavoriteUser(user2);

    service.removeFavoriteUser(user1);

    service.getFavoriteUsers().subscribe((users) => {
      expect(users).toEqual([user2]);
    });
  });

  it('should not fail when trying to remove a non-existent user', () => {
    const user: User = { id: 1, first_name: 'John Doe' } as User;

    service.removeFavoriteUser(user);

    expect(true).toBe(true);
  });
});
