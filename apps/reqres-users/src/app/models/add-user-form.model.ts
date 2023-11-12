import { FormControl } from '@angular/forms';

export interface AddUserForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  imgUrl: FormControl<string | null>;
}
