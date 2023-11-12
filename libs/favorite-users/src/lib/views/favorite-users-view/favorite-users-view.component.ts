import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListItemComponent } from '@mytomorrows/shared-ui';
import { FavoriteUsersService } from '@mytomorrows/shared-services';
import { User } from '@mytomorrows/shared-models';

@Component({
  selector: 'mytomorrows-favorite-users-view',
  standalone: true,
  imports: [CommonModule, UserListItemComponent],
  templateUrl: './favorite-users-view.component.html',
  styleUrls: ['./favorite-users-view.component.scss'],
})
export class FavoriteUsersViewComponent {
  readonly favoriteUsers$ = this.favoriteUsersService.getFavoriteUsers$();
  constructor(private readonly favoriteUsersService: FavoriteUsersService) {}

  toggleFavorite(user: User) {
    this.favoriteUsersService.removeFavoriteUser(user);
  }
}
