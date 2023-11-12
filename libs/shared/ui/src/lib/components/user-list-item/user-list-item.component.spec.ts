import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListItemComponent } from './user-list-item.component';
import { User } from '@mytomorrows/shared-models';
import { By } from '@angular/platform-browser';
const MOCK_USER = {
  first_name: 'John',
  last_name: 'Doe',
  id: 1,
  email: 'abc@gmail.com',
  isFavorite: false,
  avatar: '',
} as User;
describe('UserListItemComponent', () => {
  let component: UserListItemComponent;
  let fixture: ComponentFixture<UserListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListItemComponent);
    component = fixture.componentInstance;
    component.user = MOCK_USER;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('handleToggleFavorite should emit', () => {
    jest.spyOn(component.toggleFavorite, 'emit');
    const elem = fixture.debugElement.query(
      By.css('[data-role="favorite-toggle-button"]')
    );
    elem.triggerEventHandler('click');
    expect(component.toggleFavorite.emit).toHaveBeenCalled();
  });
  it('handleDeleteUser should emit', () => {
    jest.spyOn(component.deleteUser, 'emit');
    const elem = fixture.debugElement.query(
      By.css('[data-role="delete-user-button"]')
    );
    elem.triggerEventHandler('click');
    expect(component.deleteUser.emit).toHaveBeenCalled();
  });
});
