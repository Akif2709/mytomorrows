import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/users.model';

@Component({
  selector: 'mytomorrows-user-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list-item.component.html',
})
export class UserListItemComponent {
  @Input({ required: true }) isFavorite: boolean = false;
  @Input({ required: true }) user?: User;
  @Input() favoriteButtonDisabled = false;

  @Output() toggleFavorite = new EventEmitter<void>();
  @Output() deleteUser = new EventEmitter<void>();

  handleToggleFavorite() {
    this.toggleFavorite.next();
  }
  handleDeleteUser() {
    this.deleteUser.next();
  }
}
