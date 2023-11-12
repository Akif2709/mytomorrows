import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FavoriteUsersService,
  UsersService,
} from '@mytomorrows/shared-services';
import { of } from 'rxjs';
import { User } from '@mytomorrows/shared-models';

const MOCK_USERS = [
  {
    id: 1,
    first_name: 'Elvis',
    last_name: 'Presley',
    isFavorite: false,
  },
  {
    id: 2,
    first_name: 'Johhny',
    last_name: 'Cash',
    isFavorite: false,
  },
  {
    id: 3,
    first_name: 'Muzeyyen',
    last_name: 'Senar',
    isFavorite: false,
  },
] as User[];

const MOCK_FAVORITE_USERS = [
  {
    id: 1,
    first_name: 'Elvis',
    last_name: 'Presley',
    isFavorite: true,
  },
] as User[];

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const usersServiceMock = {
    getUsers: jest.fn(() => of(MOCK_USERS)),
    getRandomUser: jest.fn(() => of({})),
    deleteUser: jest.fn(() => of({})),
    createUser: jest.fn(() => of({})),
  };

  const favoriteUsersServiceStub = {
    addFavoriteUser: jest.fn(() => of()),
    removeFavoriteUser: jest.fn(),
    getFavoriteUsers: jest.fn(() => of(MOCK_FAVORITE_USERS)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: UsersService, useValue: usersServiceMock },
        { provide: FavoriteUsersService, useValue: favoriteUsersServiceStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on ngOnInit', () => {
    component.ngOnInit();
    expect(usersServiceMock.getUsers).toHaveBeenCalled();
  });

  it('usersWithFavoriteData shoudl return users with favorite info', (done) => {
    component.ngOnInit();
    component.usersWithFavoriteData$.subscribe((data) => {
      expect(data.value).toEqual([
        MOCK_FAVORITE_USERS[0],
        MOCK_USERS[1],
        MOCK_USERS[2],
      ]);
      done();
    });
  });
  it('toggleFavorite shoudl mark user as favorite', () => {
    component.toggleFavorite({ id: 1, isFavorite: false } as User);
    expect(favoriteUsersServiceStub.addFavoriteUser).toHaveBeenCalledWith({
      id: 1,
      isFavorite: false,
    } as User);
  });
  it('toggleFavorite shoudl remove user from favorite', () => {
    component.toggleFavorite({ id: 1, isFavorite: true } as User);
    expect(favoriteUsersServiceStub.removeFavoriteUser).toHaveBeenCalledWith({
      id: 1,
      isFavorite: true,
    } as User);
  });
  it('deleteUser shoudl delete the user', (done) => {
    component.ngOnInit();
    component.deleteUser({ id: 1, isFavorite: true } as User);
    expect(usersServiceMock.deleteUser).toHaveBeenCalledWith({
      id: 1,
      isFavorite: true,
    } as User);
    component.usersWithFavoriteData$.subscribe((data) => {
      expect(data.value).toEqual(data.value?.filter((i) => i.id !== 1));
      done();
    });
  });
});
