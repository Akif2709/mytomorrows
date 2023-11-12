import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteUsersViewComponent } from './favorite-users-view.component';

describe('FavoriteUsersViewComponent', () => {
  let component: FavoriteUsersViewComponent;
  let fixture: ComponentFixture<FavoriteUsersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteUsersViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteUsersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
