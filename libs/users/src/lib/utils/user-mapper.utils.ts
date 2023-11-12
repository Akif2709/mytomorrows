import { FormGroup } from '@angular/forms';
import { AddUserForm } from '../models/add-user-form.model';
import { DEFAULT_AVATAR_URL, RawUser } from '@mytomorrows/shared-models';

export function mapPostUser(userForm: FormGroup<AddUserForm>): RawUser {
  const { email, firstName, lastName, imgUrl } = userForm.value;
  return {
    id: new Date().getTime(),
    first_name: firstName as string,
    last_name: lastName as string,
    email: email as string,
    avatar: (imgUrl as string) || DEFAULT_AVATAR_URL,
  };
}
