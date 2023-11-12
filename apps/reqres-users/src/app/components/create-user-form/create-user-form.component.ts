import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserForm } from '../../models/add-user-form.model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'mytomorrows-create-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss'],
})
export class CreateUserFormComponent {
  submitted = false;
  @Input() formGroup?: FormGroup<AddUserForm>;
  @Output() submitForm = new EventEmitter<void>();

  handleOnSubmit() {
    this.submitted = true;
    if (this.formGroup?.valid) {
      this.submitForm.emit();
      this.submitted = false;
    }
  }

  getControl(name: string) {
    return this.formGroup?.get(name);
  }
}
