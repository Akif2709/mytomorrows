import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteUsersViewComponent } from './favorite-users-view.component';
import { FavoriteUsersService } from '@mytomorrows/shared-services';
import { User } from '@mytomorrows/shared-models';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('FavoriteUsersViewComponent', () => {
  let component: FavoriteUsersViewComponent;
  let fixture: ComponentFixture<FavoriteUsersViewComponent>;

  const favoriteUserStub = {
    removeFavoriteUser: jest.fn(),
    getFavoriteUsers: jest.fn().mockReturnValue(of([])),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteUsersViewComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: FavoriteUsersService,
          useValue: favoriteUserStub,
        },
      ],
    });
    fixture = TestBed.createComponent(FavoriteUsersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('removeFavoriteUser method should call service method', () => {
    component.removeFavoriteUser({ id: 1 } as User);
    expect(favoriteUserStub.removeFavoriteUser).toHaveBeenCalledWith({ id: 1 });
  });
});
