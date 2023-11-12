import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mapPostUser } from './user-mapper.utils';
import { AddUserForm } from '../models/add-user-form.model';
import { DEFAULT_AVATAR_URL } from '@mytomorrows/shared-models';

describe('mapPostUser', () => {
  it('should map form values to RawUser', () => {
    const userForm = new FormGroup({
      firstName: new FormControl('John', [Validators.required]),
      lastName: new FormControl('Doe', [Validators.required]),
      email: new FormControl('john.doe@example.com', [
        Validators.required,
        Validators.email,
      ]),
      imgUrl: new FormControl('http://example.com/avatar.jpg'),
    });

    const rawUser = mapPostUser(userForm);

    expect(rawUser.id).toEqual(expect.any(Number));
    expect(rawUser.first_name).toBe('John');
    expect(rawUser.last_name).toBe('Doe');
    expect(rawUser.email).toBe('john.doe@example.com');
    expect(rawUser.avatar).toBe('http://example.com/avatar.jpg');
  });

  it('should use DEFAULT_AVATAR_URL if imgUrl is not provided', () => {
    const userForm = new FormGroup({
      firstName: new FormControl('Jane', [Validators.required]),
      lastName: new FormControl('Doe', [Validators.required]),
      email: new FormControl('jane.doe@example.com', [
        Validators.required,
        Validators.email,
      ]),
      imgUrl: new FormControl(null),
    });

    const rawUser = mapPostUser(userForm as FormGroup<AddUserForm>);

    expect(rawUser.avatar).toBe(DEFAULT_AVATAR_URL);
  });
});
