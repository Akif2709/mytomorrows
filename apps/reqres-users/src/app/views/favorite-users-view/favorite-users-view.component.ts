import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteUsersService } from '../../services/favorite-users.service';
import { UserListItemComponent } from '../../components/user-list-item/user-list-item.component';
import { User } from '../../models/users.model';

@Component({
  selector: 'mytomorrows-favorite-users-view',
  standalone: true,
  imports: [CommonModule, UserListItemComponent],
  templateUrl: './favorite-users-view.component.html',
  styleUrls: ['./favorite-users-view.component.scss'],
})
export class FavoriteUsersViewComponent {
  readonly favoriteUsers$ = this.favoriteUsersService.getFavoriteUsers$()
  constructor(private readonly favoriteUsersService:FavoriteUsersService){}

  toggleFavorite(user:User){
    this.favoriteUsersService.removeFavoriteUser(user)
  }
}
