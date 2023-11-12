import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUserFormComponent } from './create-user-form.component';
import { FormControl, FormGroup } from '@angular/forms';
import { AddUserForm } from '../../models/add-user-form.model';

describe('CreateUserFormComponent', () => {
  let component: CreateUserFormComponent;
  let fixture: ComponentFixture<CreateUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUserFormComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      imgUrl: new FormControl(),
    } as AddUserForm);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('handleOnSubmit should emit the value', () => {
    const spy = jest.spyOn(component.submitForm, 'emit');
    component.handleOnSubmit();
    expect(spy).toHaveBeenCalled();
    expect(component.submitted).toBe(false);
  });
});
